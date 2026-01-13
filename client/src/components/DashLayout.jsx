import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GrassIcon from "@mui/icons-material/Grass";
import SettingsIcon from "@mui/icons-material/Settings";
import { Stack, Avatar, Chip } from "@mui/material";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#1b5e20",
  borderRight: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  backgroundColor: "#1b5e20",
  borderRight: "none",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#ffffff",
  color: "#1b5e20",
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0",
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#81c784",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: "#f5f5f5",
  border: "1px solid #e0e0e0",
  "&:hover": {
    backgroundColor: "#eeeeee",
    borderColor: "#c8e6c9",
  },
  "&:focus-within": {
    backgroundColor: "#fff",
    borderColor: "#43a047",
    boxShadow: "0 0 0 2px rgba(67, 160, 71, 0.1)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  transition: "all 0.2s ease",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#263238",
  fontFamily: '"Nunito", sans-serif',
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "22ch",
    },
    "&::placeholder": {
      color: "#9e9e9e",
      opacity: 1,
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ selected }) => ({
  margin: "4px 12px",
  borderRadius: 8,
  backgroundColor: selected ? "rgba(165, 214, 167, 0.2)" : "transparent",
  borderLeft: selected ? "3px solid #a5d6a7" : "3px solid transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: selected
      ? "rgba(165, 214, 167, 0.25)"
      : "rgba(255, 255, 255, 0.08)",
    transform: "translateX(4px)",
  },
  "& .MuiListItemIcon-root": {
    color: selected ? "#a5d6a7" : "rgba(255, 255, 255, 0.7)",
    minWidth: 40,
  },
  "& .MuiListItemText-primary": {
    fontWeight: selected ? 700 : 500,
    color: selected ? "#a5d6a7" : "rgba(255, 255, 255, 0.9)",
    fontFamily: '"Nunito", sans-serif',
    fontSize: "0.9rem",
  },
}));

const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/dashboard/dash-articles":
      return "Plant Guides";
    case "/dashboard/users":
      return "Users";
    default:
      return "Dashboard";
  }
};

const DashLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const name =
    location.state?.firstName || localStorage.getItem("firstName") || "User";
  const userType = location.state?.type || localStorage.getItem("type");
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");
    navigate("/");
  };

  const menuItems = [
    {
      text: "Plant Guides",
      icon: <ArticleIcon />,
      path: "/dashboard/dash-articles",
      show: true,
    },
    {
      text: "Users",
      icon: <PeopleIcon />,
      path: "/dashboard/users",
      show: userType === "admin",
    },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#fafafa", minHeight: "100vh" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <IconButton
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              color: "#1b5e20",
              bgcolor: "#e8f5e9",
              borderRadius: 2,
              width: 40,
              height: 40,
              "&:hover": {
                bgcolor: "#c8e6c9",
              },
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 700,
                color: "#1b5e20",
              }}
            >
              {pageTitle}
            </Typography>
            <Chip
              label="Admin Panel"
              size="small"
              sx={{
                bgcolor: "#e8f5e9",
                color: "#2e7d32",
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
              }}
            />
          </Stack>

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search guides..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* User Info */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                sx={{
                  bgcolor: "#1b5e20",
                  color: "#fff",
                  width: 38,
                  height: 38,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#263238",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#43a047",
                    textTransform: "capitalize",
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600,
                  }}
                >
                  {userType || "User"}
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="outlined"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                borderColor: "#c8e6c9",
                color: "#1b5e20",
                borderRadius: 2,
                textTransform: "none",
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#43a047",
                  bgcolor: "#e8f5e9",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            background: open
              ? "linear-gradient(180deg, #1b5e20 0%, #2e7d32 100%)"
              : "transparent",
            minHeight: 70,
          }}
        >
          {open && (
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GrassIcon sx={{ color: "#a5d6a7", fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: "1.1rem",
                }}
              >
                Plantina
              </Typography>
            </Stack>
          )}
          {!open && (
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <GrassIcon sx={{ color: "#a5d6a7", fontSize: 24 }} />
            </Box>
          )}
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mx: 2 }} />

        {/* Menu Label */}
        {open && (
          <Typography
            variant="overline"
            sx={{
              color: "#81c784",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: 1.5,
              px: 3,
              pt: 2,
              pb: 1,
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            MANAGEMENT
          </Typography>
        )}

        {/* Navigation Links */}
        <List>
          {menuItems
            .filter((item) => item.show)
            .map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                <StyledListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </StyledListItemButton>
              </ListItem>
            ))}
        </List>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* General Label */}
        {open && (
          <Typography
            variant="overline"
            sx={{
              color: "#81c784",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: 1.5,
              px: 3,
              pt: 2,
              pb: 1,
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            GENERAL
          </Typography>
        )}

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mx: 2 }} />

        {/* Bottom Section */}
        <List sx={{ pb: 1 }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledListItemButton
              component={Link}
              to="/"
              sx={{
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Back to Site"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </StyledListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledListItemButton
              sx={{
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </StyledListItemButton>
          </ListItem>
        </List>

        {/* User Card (when drawer is open) */}
        {open && (
          <Box
            sx={{
              m: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#43a047",
                  color: "#fff",
                  width: 44,
                  height: 44,
                  fontWeight: 700,
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    fontFamily: '"Nunito", sans-serif',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#a5d6a7",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#a5d6a7",
                      textTransform: "capitalize",
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {userType || "User"}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Plant Emojis Footer */}
        {open && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ pb: 2, pt: 1 }}
          >
            {["🌱", "🌿", "🪴", "🌵"].map((emoji, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontSize: "1rem",
                  opacity: 0.5,
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 1,
                    transform: "scale(1.3)",
                  },
                }}
              >
                {emoji}
              </Typography>
            ))}
          </Stack>
        )}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#fafafa",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;