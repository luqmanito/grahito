export function authErrorMessage(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "Email atau password tidak cocok.";
  if (normalized.includes("email not confirmed")) return "Email belum diverifikasi. Periksa kotak masukmu.";
  if (normalized.includes("user already registered")) return "Email ini sudah terdaftar. Silakan masuk.";
  if (normalized.includes("password should be")) return "Password belum memenuhi ketentuan minimum.";
  if (normalized.includes("rate limit")) return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
  return "Terjadi kendala. Silakan coba lagi.";
}
