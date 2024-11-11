import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import { Home11Icon, Logout01Icon, MapsGlobal01Icon, GridViewIcon } from 'hugeicons-react';

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function HeaderAdmin() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [agencia, setAgencia] = React.useState(() => {
        return localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile") as string) : null;
    });
    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("profile");
        navigate("/sign-in");
    };


    React.useEffect(() => {
        const handleStorageChange = () => {
            const profile = localStorage.getItem("profile");
            setAgencia(profile ? JSON.parse(profile) : null);
        };
    
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ background: "#2C2C54" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" fontSize={30} noWrap component="div">
                        Dashboard  - {agencia?.nombre}
                    </Typography>
                </Toolbar>
                <Button
                    onClick={logout}
                    sx={{ position: "absolute", top: "50%", right: "5%", transform: "translateY(-50%)", color: "white" }}
                >
                    <Logout01Icon />
                </Button>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ background: "#2C2C54" }}>
                {/* Icon sidebar */}
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* Sidebar */}
                <List>
                    {/* Home */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                            onClick={() => navigate("/")}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                                onClick={() => navigate("/")}
                            >
                                <Home11Icon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                    {/* Tours */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                            onClick={() => navigate("/tours")}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                                onClick={() => navigate("/tours")}
                            >
                                <MapsGlobal01Icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Actividades "}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>

                    {/* Packages */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                            onClick={() => navigate("/packages")}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                                onClick={() => navigate("/packages")}
                            >
                                <GridViewIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Packages"}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}
