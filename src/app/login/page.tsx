"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginButton } from "@/components/auth/LoginButton";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, session, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (session && !loading) {
      const redirectedFrom = searchParams.get("redirectedFrom");
      router.push(redirectedFrom || "/");
    }
  }, [session, loading, router, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">과외 관리 시스템</h1>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
