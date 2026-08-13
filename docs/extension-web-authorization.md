# Web authorization untuk Kalkulator Komisi Shopee

Flow ini menghilangkan proses membuat dan menyalin kode aktivasi secara manual. Pengguna tetap memulai proses dari tombol di ekstensi. Chrome membuka website Grahito Labs, website membaca sesi login yang sudah ada, memeriksa hubungan produk, lalu mengembalikan kode satu kali langsung ke ekstensi.

## Konfigurasi manifest

```json
{
  "manifest_version": 3,
  "permissions": ["identity", "storage"],
  "host_permissions": ["https://grahito.vercel.app/*"]
}
```

Pastikan `CHROME_EXTENSION_ID` di Vercel sama dengan `chrome.runtime.id`. Redirect URI yang diterima backend hanya:

```text
https://<CHROME_EXTENSION_ID>.chromiumapp.org/grahito-auth
```

## Implementasi ekstensi

```js
const API_BASE_URL = "https://grahito.vercel.app";

async function getInstallationId() {
  const stored = await chrome.storage.local.get("installationId");
  if (stored.installationId) return stored.installationId;

  const installationId = crypto.randomUUID();
  await chrome.storage.local.set({ installationId });
  return installationId;
}

function randomState() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function connectGrahitoAccount() {
  await chrome.storage.local.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" });

  const redirectUri = chrome.identity.getRedirectURL("grahito-auth");
  const state = randomState();
  const authorizeUrl = new URL(`${API_BASE_URL}/extension/authorize`);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);

  const callbackUrl = await chrome.identity.launchWebAuthFlow({
    url: authorizeUrl.toString(),
    interactive: true,
  });

  if (!callbackUrl) throw new Error("Otorisasi dibatalkan.");

  const callback = new URL(callbackUrl);
  if (callback.searchParams.get("state") !== state) {
    throw new Error("State otorisasi tidak cocok.");
  }

  const authorizationError = callback.searchParams.get("error");
  if (authorizationError) {
    throw new Error(callback.searchParams.get("error_description") || authorizationError);
  }

  const activationCode = callback.searchParams.get("activation_code");
  if (!activationCode) throw new Error("Kode otorisasi tidak diterima.");

  const installationId = await getInstallationId();
  const response = await fetch(`${API_BASE_URL}/api/extension/devices/exchange`, {
    method: "POST",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      activationCode,
      installationId,
      deviceName: "Chrome di macOS",
      platform: "macOS",
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Aktivasi perangkat gagal.");

  await chrome.storage.local.set({
    installationId,
    deviceToken: result.deviceToken,
    deviceId: result.deviceId,
  });

  return result;
}
```

Panggil `connectGrahitoAccount()` hanya setelah pengguna menekan tombol seperti **Hubungkan akun**, bukan otomatis saat popup dibuka. Jika pengguna belum login, web flow menampilkan halaman login lalu melanjutkan otorisasi. Jika produk belum terhubung, callback mengembalikan error `product_not_connected`.

Kode otomatis hanya berlaku dua menit dan satu kali. Setelah ditukar, aturan maksimal dua instalasi aktif tetap ditegakkan oleh database.
