import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => {
    if (session) {
      // 세션을 쿠키에 저장
      Cookies.set("sb-sgypverywcewrbvvemky-auth-token", JSON.stringify(session), {
        expires: new Date(session.expires_at! * 1000),
        secure: true,
        sameSite: "lax",
      });
    } else {
      // 세션 삭제 시 쿠키도 삭제
      Cookies.remove("sb-sgypverywcewrbvvemky-auth-token");
    }
    set({ session });
  },
  setLoading: (loading) => set({ loading }),
  checkAuth: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Current session:", session);
      set({ session, user: session?.user ?? null, loading: false });

      // 세션 변경 리스너 설정
      supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth state changed:", { event, session });
        set({ session, user: session?.user ?? null });
      });
    } catch (error) {
      console.error("Auth check error:", error);
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null });
      // 쿠키 삭제
      Cookies.remove("sb-sgypverywcewrbvvemky-auth-token");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  },
}));
