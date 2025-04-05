"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@mui/material";
import { supabase } from "@/lib/supabase";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar } from "@/components/calendar/Calendar";
import { ScheduleTable } from "@/components/schedule/ScheduleTable";
import { Box, Grid } from "@mui/material";

export default function HomePage() {
  const { user, session, loading, checkAuth, signOut } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 디버깅을 위한 세션 확인
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Current session in HomePage:", session);
      console.log("Auth store state:", { user, session, loading });
    };
    checkSession();
  }, [user, session, loading]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

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
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Calendar />
          </Grid>
          <Grid item xs={12} md={6}>
            <ScheduleTable />
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
