"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    let active = true;

    try {
      const supabase = createClient();

      void supabase.auth.getUser().then(({ data }) => {
        if (active) setUser(data.user);
      });

      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (active) setUser(session?.user ?? null);
      });

      return () => {
        active = false;
        data.subscription.unsubscribe();
      };
    } catch {
      queueMicrotask(() => {
        if (active) setUser(null);
      });
      return () => {
        active = false;
      };
    }
  }, []);

  return {
    user,
    loading: user === undefined,
  };
}
