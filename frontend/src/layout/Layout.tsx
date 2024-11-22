import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Простая компонента для профиля пользователя
const UserProfile = () => (
  <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
    <Avatar sx={{ marginRight: 2, bgcolor: "primary.main", fontSize: "1.2rem" }}>
      U
    </Avatar>
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
      Username
    </Typography>
  </Box>
);

// Компонента дашборда
const Dashboard = () => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h4">Dashboard</Typography>
    <Typography variant="body1" sx={{ marginTop: 2 }}>
      Welcome to your EcoFootprint dashboard!
    </Typography>
    {/* Добавьте больше контента для дашборда здесь */}
  </Box>
);

// Основной Layout с боковым меню и шапкой
const Layout = () => {
  const [open, setOpen] = useState(false); // Drawer open/close state
  const [currentPage, setCurrentPage] = useState("dashboard"); // State to track current page

  const toggleDrawer = () => setOpen(!open);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setOpen(false); // Закрываем drawer после выбора элемента меню
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Боковое меню */}
      <Drawer
        sx={{
          width: 100,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 100,
            boxSizing: "border-box",
            backgroundColor: "background.default",
            borderRight: "none",
            boxShadow: 3,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List sx={{ paddingTop: 2 }}>
          <ListItemButton onClick={() => handleNavigation("dashboard")}>
            <ListItemText primary="Dashboard" sx={{ color: "text.primary" }} />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation("profile")}>
            <ListItemText primary="Profile" sx={{ color: "text.primary" }} />
          </ListItemButton>
          <Divider sx={{ my: 2 }} />
          {/* Добавьте дополнительные элементы меню по мере необходимости */}
        </List>
      </Drawer>

      {/* Основной контент */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Шапка с кнопкой меню и профилем */}
        <AppBar position="sticky" sx={{ backgroundColor: "primary.main", boxShadow: 3 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Ecological Footprint App
            </Typography>
            <UserProfile />
          </Toolbar>
        </AppBar>

        {/* Основной контент с динамическим отображением */}
        <Box
          sx={{
            padding: 3,
            marginTop: 8,
            flexGrow: 1,
            backgroundColor: "background.paper",
            width: "100%", // Занимает всю ширину экрана
          }}
        >
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "profile" && <UserProfile />}
          {/* Вы можете добавить больше компонентов для других страниц */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
