import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

import { logoutUser } from "../redux/actions/session";
import { deleteUser } from "../redux/actions/user";
import { unsetUID } from "../redux/actions/uid";

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
    Drawer
} from "@mui/material";

import {
    Menu,
    Dashboard,
    MenuBook,
    Biotech,
    RssFeed,
    Home,
    Login,
    Logout,
} from "@mui/icons-material";

const drawerWidth = 240;
const navItems = [
    {
        name: 'TFASoft',
        href: 'https://tfasoft.amirhossein.info',
        icon: <Home />,
    },
    {
        name: 'Docs',
        href: 'https://docs.amirhossein.info',
        icon: <MenuBook />,
    },
    {
        name: 'Blog',
        href: 'https://blog.amirhossein.info',
        icon: <RssFeed />,
    },
    {
        name: 'Demo',
        href: 'https://demo.amirhossein.info',
        icon: <Biotech />,
    },
];

const NavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const isAuth = useSelector(state => state.session);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar />
            <Typography
                variant="h6"
                sx={{ my: 2 }}
            >
                TFASoft services
            </Typography>
            <Divider />
            <List>
                {
                    navItems.map((item) => (
                        <ListItem
                            key={item}
                            disablePadding
                        >
                            <ListItemButton
                                href={item.href}
                            >
                                <ListItemIcon sx={{ color: "primary.main" }}>{ item.icon }</ListItemIcon>
                                <ListItemText
                                    primary={ item.name }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
            <List>
                {
                    isAuth
                    ?
                        <Box>
                            <ListItem
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => history.push('/panel')}
                                >
                                    <ListItemIcon sx={{ color: "primary.main" }}><Dashboard /></ListItemIcon>
                                    <ListItemText
                                        primary="Panel"
                                    />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => {
                                        dispatch(logoutUser());
                                        dispatch(unsetUID());
                                        dispatch(deleteUser());
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "primary.main" }}><Logout /></ListItemIcon>
                                    <ListItemText
                                        primary="Logout"
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    :
                        <ListItem
                            disablePadding
                        >
                            <ListItemButton
                                onClick={() => history.push('/auth')}
                            >
                                <ListItemIcon sx={{ color: "primary.main" }}><Login /></ListItemIcon>
                                <ListItemText
                                    primary="Login"
                                />
                            </ListItemButton>
                        </ListItem>
                }
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
                            onClick={() => history.push('/')}
                        >
                            TFASoft Dashboard
                        </Typography>
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            <Toolbar />
        </Box>
    )
}

export default NavBar;