"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // URL에서 해시 파라미터를 확인
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (!accessToken || !refreshToken) {
          throw new Error("No tokens found in URL");
        }

        // 토큰으로 세션 설정
        const {
          data: { session },
          error,
        } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) throw error;

        console.log("Session set:", session);

        setUser(session?.user ?? null);
        setSession(session);
        setLoading(false);

        // 세션 설정 후 잠시 대기
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 원래 접근하려던 페이지로 리디렉션
        const redirectedFrom = searchParams.get("redirectedFrom");
        const redirectUrl = redirectedFrom || "/";
        console.log("Redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error in auth callback:", error);
        window.location.href = "/login";
      }
    };

    handleAuthCallback();
  }, [searchParams, setUser, setSession, setLoading]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">로그인 처리 중...</h1>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
