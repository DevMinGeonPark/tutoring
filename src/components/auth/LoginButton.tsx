import { Button } from "@mui/material";
import { supabase } from "@/lib/supabase";

export const LoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleGoogleLogin}
      sx={{
        backgroundColor: "#4285F4",
        "&:hover": {
          backgroundColor: "#357ABD",
        },
      }}
    >
      Google로 로그인
    </Button>
  );
};
