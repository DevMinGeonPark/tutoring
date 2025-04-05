import { AppBar, Box, Container, IconButton, Toolbar, Typography, Avatar } from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            과외 관리 시스템
          </Typography>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
