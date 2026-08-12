import "server-only";

import { createHash, randomBytes } from "node:crypto";

export function createOpaqueToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function hashOpaqueToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
