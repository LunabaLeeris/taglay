import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import YardIcon from '@mui/icons-material/Yard';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    navigate('auth/signin');
    setMobileOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('auth/signup');
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: <SpaIcon sx={{ fontSize: 18 }} /> },
    { label: 'About', path: '/about', icon: <LocalFloristIcon sx={{ fontSize: 18 }} /> },
    { label: 'Articles', path: '/articles', icon: <YardIcon sx={{ fontSize: 18 }} /> },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile Drawer
  const drawer = (
    <Box
      sx={{
        width: 300,
        height: '100%',
        bgcolor: '#1b5e20',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GrassIcon sx={{ color: '#a5d6a7' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 700,
              }}
            >
              Plantina
            </Typography>
          </Stack>
          <IconButton 
            onClick={handleDrawerToggle} 
            sx={{ 
              color: '#a5d6a7',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Navigation Links */}
      <Box sx={{ flex: 1, p: 2, pt: 3 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#81c784',
            fontSize: '0.7rem',
            letterSpacing: 2,
            px: 2,
            display: 'block',
            mb: 1,
          }}
        >
          NAVIGATION
        </Typography>
        <List sx={{ p: 0 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.label}
              component={Link}
              to={link.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mb: 1,
                py: 1.5,
                bgcolor: isActive(link.path) ? 'rgba(165, 214, 167, 0.2)' : 'transparent',
                borderLeft: isActive(link.path) ? '3px solid #66bb6a' : '3px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box sx={{ color: isActive(link.path) ? '#a5d6a7' : '#81c784', mr: 2, display: 'flex' }}>
                {link.icon}
              </Box>
              <ListItemText
                primary={link.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: isActive(link.path) ? '#a5d6a7' : '#fff',
                    fontWeight: isActive(link.path) ? 700 : 500,
                    fontFamily: '"Nunito", sans-serif',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Decorative Element */}
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: 'rgba(0,0,0,0.1)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          {['🌿', '🪴', '🌱', '🍃'].map((emoji, idx) => (
            <Typography key={idx} sx={{ fontSize: '1.2rem' }}>
              {emoji}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Drawer Footer with Buttons */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Stack spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleLoginClick}
            sx={{
              borderColor: 'rgba(165, 214, 167, 0.5)',
              color: '#a5d6a7',
              borderRadius: 2,
              py: 1.2,
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#a5d6a7',
                bgcolor: 'rgba(165, 214, 167, 0.1)',
              },
            }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegisterClick}
            startIcon={<SpaIcon />}
            sx={{
              bgcolor: '#43a047',
              color: '#fff',
              borderRadius: 2,
              py: 1.2,
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#66bb6a',
              },
            }}
          >
            Start Growing
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#fff',
          borderBottom: '1px solid',
          borderColor: '#e0e0e0',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1, px: { xs: 0 } }}>
            {/* Logo */}
            <Stack
              component={Link}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{
                textDecoration: 'none',
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: '#e8f5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#c8e6c9',
                    transform: 'rotate(10deg)',
                  },
                }}
              >
                <GrassIcon sx={{ color: '#43a047', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: '#1b5e20',
                  display: { xs: 'none', sm: 'block' },
                  letterSpacing: 0.5,
                }}
              >
                Plantina
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 3,
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                p: 0.5,
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: isActive(link.path) ? '#1b5e20' : '#546e7a',
                    fontWeight: 600,
                    fontFamily: '"Nunito", sans-serif',
                    px: 2.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: isActive(link.path) ? '#fff' : 'transparent',
                    boxShadow: isActive(link.path) ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isActive(link.path) ? '#fff' : 'rgba(255,255,255,0.8)',
                      color: '#1b5e20',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            {/* Desktop Buttons */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Button
                variant="text"
                onClick={handleLoginClick}
                sx={{
                  color: '#263238',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  px: 2,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleRegisterClick}
                startIcon={<SpaIcon />}
                sx={{
                  bgcolor: '#1b5e20',
                  color: '#fff',
                  borderRadius: 2,
                  px: 3,
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#2e7d32',
                    boxShadow: '0 4px 12px rgba(27, 94, 32, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Start Growing
              </Button>
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: '#1b5e20',
                bgcolor: '#e8f5e9',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#c8e6c9',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;