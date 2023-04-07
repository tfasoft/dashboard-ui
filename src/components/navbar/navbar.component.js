import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";

import {
  Menu,
  Dashboard,
  MenuBook,
  Biotech,
  RssFeed,
  Home,
  Login,
} from "@mui/icons-material";

const drawerWidth = 240;
const navItems = [
  {
    name: "TFASoft",
    href: "https://tfasoft.amirhossein.info",
    icon: <Home />,
  },
  {
    name: "Docs",
    href: "https://docs.amirhossein.info",
    icon: <MenuBook />,
  },
  {
    name: "Blog",
    href: "https://blog.amirhossein.info",
    icon: <RssFeed />,
  },
  {
    name: "Demo",
    href: "https://demo.amirhossein.info",
    icon: <Biotech />,
  },
];

const NavBar = () => {
  const history = useRouter();

  const isAuth = useSelector((state) => state.token);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Toolbar />
      <Typography variant="h6" sx={{ my: 2 }}>
        TFASoft services
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemIcon sx={{ color: "primary.main" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => history.push(isAuth ? "/panel" : "/auth")}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={isAuth ? "Panel" : "Login"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
        color="primary"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                cursor: "pointer",
                flexGrow: 1,
              }}
              onClick={() => history.push("/")}
            >
              TFASoft Dashboard
            </Typography>
            <Button
              variant="text"
              onClick={() => history.push(isAuth ? "/panel" : "/auth")}
              sx={{
                color: "white",
              }}
            >
              {isAuth ? "Panel" : "Login / Register"}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar />
    </Box>
  );
};

export default NavBar;
