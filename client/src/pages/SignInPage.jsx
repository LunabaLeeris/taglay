import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/UserService';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  Grid,
} from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import YardIcon from '@mui/icons-material/Yard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await loginUser({ email, password });
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);

      navigate('/dashboard/dash-articles', {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#1b5e20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.03)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.03)',
        }}
      />

      {/* Floating Icons */}
      <Box sx={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.08 }}>
        <LocalFloristIcon sx={{ fontSize: 120, color: '#fff' }} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.08 }}>
        <YardIcon sx={{ fontSize: 140, color: '#fff' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: '60%', left: '8%', opacity: 0.05 }}>
        <FilterVintageIcon sx={{ fontSize: 80, color: '#fff' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: '20%', right: '10%', opacity: 0.05 }}>
        <SpaIcon sx={{ fontSize: 100, color: '#fff' }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6} lg={5}>
            <Box sx={{ display: { xs: 'none', md: 'block' }, pr: 4 }}>
              {/* Logo */}
              <Stack
                component={Link}
                to="/"
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ textDecoration: 'none', mb: 4 }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GrassIcon sx={{ color: '#a5d6a7', fontSize: 28 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 800,
                    color: '#fff',
                  }}
                >
                  Plantina
                </Typography>
              </Stack>

              {/* Heading */}
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                  color: '#fff',
                  fontSize: { md: '2.5rem', lg: '3rem' },
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Welcome back to your
                <Box component="span" sx={{ display: 'block', color: '#a5d6a7' }}>
                  green sanctuary
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#c8e6c9',
                  lineHeight: 1.8,
                  fontFamily: '"Nunito", sans-serif',
                  mb: 4,
                  maxWidth: 400,
                }}
              >
                Sign in to manage your plant guides, track your garden's growth, 
                and share your botanical wisdom.
              </Typography>

              {/* Features */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                {[
                  { icon: <WbSunnyIcon />, text: 'Expert care guides for every plant', color: '#fff8e1' },
                  { icon: <WaterDropIcon />, text: 'Watering schedules & reminders', color: '#e3f2fd' },
                  { icon: <SpaIcon />, text: 'Community tips & support', color: '#e8f5e9' },
                ].map((item, idx) => (
                  <Stack key={idx} direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        bgcolor: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1b5e20',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: '#c8e6c9', fontFamily: '"Nunito", sans-serif' }}
                    >
                      {item.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Stats Row */}
              <Stack
                direction="row"
                spacing={4}
                sx={{
                  pt: 4,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {[
                  { value: '50+', label: 'Plant Guides' },
                  { value: '10K+', label: 'Plant Parents' },
                  { value: '4.9', label: 'User Rating' },
                ].map((stat, idx) => (
                  <Box key={idx}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#fff',
                        fontWeight: 800,
                        fontFamily: '"Nunito", sans-serif',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#a5d6a7', fontFamily: '"Nunito", sans-serif' }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 4,
                bgcolor: '#fff',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              }}
            >
              {/* Mobile Logo */}
              <Stack
                component={Link}
                to="/"
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent="center"
                sx={{
                  textDecoration: 'none',
                  mb: 3,
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 2,
                    bgcolor: '#e8f5e9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GrassIcon sx={{ color: '#43a047', fontSize: 26 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 800,
                    color: '#1b5e20',
                  }}
                >
                  Plantina
                </Typography>
              </Stack>

              {/* Form Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                  <Typography sx={{ fontSize: '1.5rem' }}>🌱</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 600,
                      color: '#1b5e20',
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: '#546e7a', fontFamily: '"Nunito", sans-serif' }}
                >
                  Enter your credentials to access your garden
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert
                  severity="error"
                  icon={<Typography sx={{ fontSize: '1.2rem' }}>🥀</Typography>}
                  sx={{
                    mb: 3,
                    bgcolor: '#ffebee',
                    color: '#c62828',
                    borderRadius: 2,
                    '& .MuiAlert-message': { fontFamily: '"Nunito", sans-serif' },
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Form */}
              <Box component="form" onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: '#81c784' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontFamily: '"Nunito", sans-serif',
                        '& fieldset': { borderColor: '#e0e0e0' },
                        '&:hover fieldset': { borderColor: '#a5d6a7' },
                        '&.Mui-focused fieldset': { borderColor: '#43a047' },
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: '"Nunito", sans-serif',
                        color: '#9e9e9e',
                        '&.Mui-focused': { color: '#43a047' },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: '#81c784' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            sx={{ color: '#9e9e9e', '&:hover': { color: '#43a047' } }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontFamily: '"Nunito", sans-serif',
                        '& fieldset': { borderColor: '#e0e0e0' },
                        '&:hover fieldset': { borderColor: '#a5d6a7' },
                        '&.Mui-focused fieldset': { borderColor: '#43a047' },
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: '"Nunito", sans-serif',
                        color: '#9e9e9e',
                        '&.Mui-focused': { color: '#43a047' },
                      },
                    }}
                  />

                  {/* Forgot Password */}
                  <Box sx={{ textAlign: 'right', mt: -1 }}>
                    <Typography
                      component={Link}
                      to="/auth/forgot-password"
                      variant="body2"
                      sx={{
                        color: '#43a047',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      bgcolor: '#1b5e20',
                      color: '#fff',
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      fontFamily: '"Nunito", sans-serif',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#2e7d32',
                        boxShadow: '0 4px 12px rgba(27, 94, 32, 0.3)',
                      },
                      '&:disabled': { bgcolor: '#a5d6a7', color: '#fff' },
                    }}
                    endIcon={!isLoading && <ArrowForwardIcon />}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  {/* Divider */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ flex: 1, height: 1, bgcolor: '#e0e0e0' }} />
                    <Typography
                      variant="caption"
                      sx={{ color: '#9e9e9e', fontFamily: '"Nunito", sans-serif' }}
                    >
                      or
                    </Typography>
                    <Box sx={{ flex: 1, height: 1, bgcolor: '#e0e0e0' }} />
                  </Stack>

                  {/* Sign Up Button */}
                  <Button
                    component={Link}
                    to="/auth/signup"
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#c8e6c9',
                      color: '#1b5e20',
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      fontFamily: '"Nunito", sans-serif',
                      textTransform: 'none',
                      '&:hover': { borderColor: '#43a047', bgcolor: '#e8f5e9' },
                    }}
                    startIcon={<SpaIcon />}
                  >
                    Create New Account
                  </Button>
                </Stack>
              </Box>

              {/* Terms */}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: '#9e9e9e',
                  textAlign: 'center',
                  mt: 3,
                  fontFamily: '"Nunito", sans-serif',
                  lineHeight: 1.6,
                }}
              >
                By signing in, you agree to our{' '}
                <Box
                  component={Link}
                  to="/terms"
                  sx={{ color: '#43a047', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Terms
                </Box>
                {' & '}
                <Box
                  component={Link}
                  to="/privacy"
                  sx={{ color: '#43a047', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Privacy Policy
                </Box>
              </Typography>

              {/* Plant Emojis */}
              <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                {['🌱', '🌿', '🪴', '🌵', '🍃'].map((emoji, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      fontSize: '1.3rem',
                      opacity: 0.4,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': { opacity: 1, transform: 'scale(1.3) translateY(-2px)' },
                    }}
                  >
                    {emoji}
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignInPage;