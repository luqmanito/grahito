import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/account";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (safeNext === "/verify-email") {
        const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });

        if (!signOutError) {
          return NextResponse.redirect(`${origin}/verify-email?status=activated`);
        }

        return NextResponse.redirect(`${origin}/verify-email?status=error`);
      }

      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/verify-email?status=error`);
}
