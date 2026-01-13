import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import YardIcon from '@mui/icons-material/Yard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
  });

  const steps = ['Personal Info', 'Contact Details', 'Security'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(formData);
      alert('Registration successful! Please sign in.');
      navigate('/auth/signin');
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      fontFamily: '"Nunito", sans-serif',
      bgcolor: '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#a5d6a7' },
      '&.Mui-focused fieldset': { borderColor: '#43a047' },
    },
    '& .MuiInputLabel-root': {
      fontFamily: '"Nunito", sans-serif',
      color: '#9e9e9e',
      '&.Mui-focused': { color: '#43a047' },
    },
  };

  const selectStyles = {
    borderRadius: 2,
    fontFamily: '"Nunito", sans-serif',
    bgcolor: '#fff',
    '& fieldset': { borderColor: '#e0e0e0' },
    '&:hover fieldset': { borderColor: '#a5d6a7' },
    '&.Mui-focused fieldset': { borderColor: '#43a047' },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      {/* LEFT SIDE - Green Content Panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: { md: '40%', lg: '45%' },
          bgcolor: '#1b5e20',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { md: 5, lg: 6 },
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
            top: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.04)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.04)',
          }}
        />

        {/* Floating Icons */}
        <Box sx={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.08 }}>
          <LocalFloristIcon sx={{ fontSize: 80, color: '#fff' }} />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '15%', left: '5%', opacity: 0.06 }}>
          <YardIcon sx={{ fontSize: 100, color: '#fff' }} />
        </Box>
        <Box sx={{ position: 'absolute', top: '45%', right: '5%', opacity: 0.05 }}>
          <FilterVintageIcon sx={{ fontSize: 60, color: '#fff' }} />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '40%', left: '15%', opacity: 0.04 }}>
          <WbSunnyIcon sx={{ fontSize: 50, color: '#fff' }} />
        </Box>

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <Stack
            component={Link}
            to="/"
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ textDecoration: 'none', mb: 5 }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GrassIcon sx={{ color: '#a5d6a7', fontSize: 26 }} />
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
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Begin your
            <Box component="span" sx={{ display: 'block', color: '#a5d6a7' }}>
              plant journey
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#c8e6c9',
              lineHeight: 1.8,
              fontFamily: '"Nunito", sans-serif',
              mb: 4,
              maxWidth: 380,
            }}
          >
            Join thousands of plant enthusiasts. Get access to expert guides, 
            personalized tips, and a thriving community.
          </Typography>

          {/* Benefits */}
          <Stack spacing={2} sx={{ mb: 5 }}>
            {[
              'Access 50+ detailed plant guides',
              'Get personalized care reminders',
              'Connect with plant lovers',
              'Track your growing collection',
            ].map((text, idx) => (
              <Stack key={idx} direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon sx={{ color: '#a5d6a7', fontSize: 22 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#c8e6c9',
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* Testimonial */}
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.08)',
              borderLeft: '4px solid #a5d6a7',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#e8f5e9',
                fontStyle: 'italic',
                fontFamily: '"Nunito", sans-serif',
                mb: 2,
                lineHeight: 1.7,
              }}
            >
              "Plantina helped me transform my apartment into a beautiful indoor 
              jungle. The community is incredibly supportive!"
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: '#43a047',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                🌸
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  Chleo M.
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#a5d6a7',
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  Plant parent since 2023
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Stats */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              mt: 5,
              pt: 4,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {[
              { value: '10K+', label: 'Members' },
              { value: '50+', label: 'Guides' },
              { value: '4.9', label: 'Rating' },
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
                  sx={{
                    color: '#a5d6a7',
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* RIGHT SIDE - Form Panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fafafa',
          p: { xs: 2, sm: 4 },
          overflow: 'auto',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 500 }}>
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
                width: 42,
                height: 42,
                borderRadius: 2,
                bgcolor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              }}
            >
              Plantina
            </Typography>
          </Stack>

          {/* Form Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              bgcolor: '#fff',
              border: '1px solid',
              borderColor: '#e0e0e0',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography sx={{ fontSize: '1.4rem' }}>🌿</Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: '#1b5e20',
                  }}
                >
                  Create Account
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  color: '#546e7a',
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                Fill in your details to get started
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                mb: 3,
                '& .MuiStepLabel-label': {
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  mt: 0.5,
                },
                '& .MuiStepLabel-label.Mui-active': { color: '#1b5e20' },
                '& .MuiStepLabel-label.Mui-completed': { color: '#43a047' },
                '& .MuiStepIcon-root': { color: '#e0e0e0' },
                '& .MuiStepIcon-root.Mui-active': { color: '#1b5e20' },
                '& .MuiStepIcon-root.Mui-completed': { color: '#43a047' },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Error */}
            {error && (
              <Alert
                severity="error"
                icon={<Typography sx={{ fontSize: '1rem' }}>🥀</Typography>}
                sx={{
                  mb: 2,
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
            <Box component="form" onSubmit={handleRegister}>
              {/* Step 1 */}
              {activeStep === 0 && (
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon sx={{ color: '#81c784', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon sx={{ color: '#81c784', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    size="small"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeOutlinedIcon sx={{ color: '#81c784', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CakeOutlinedIcon sx={{ color: '#81c784', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel sx={{ fontFamily: '"Nunito", sans-serif', color: '#9e9e9e' }}>
                          Gender
                        </InputLabel>
                        <Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          label="Gender"
                          required
                          sx={selectStyles}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Stack>
              )}

              {/* Step 2 */}
              {activeStep === 1 && (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: '#81c784', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlinedIcon sx={{ color: '#81c784', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <HomeOutlinedIcon sx={{ color: '#81c784', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />
                </Stack>
              )}

              {/* Step 3 */}
              {activeStep === 2 && (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: '#81c784', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            size="small"
                            sx={{ color: '#9e9e9e' }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  {/* Password Requirements */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#e8f5e9',
                      border: '1px solid #c8e6c9',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#1b5e20',
                        fontWeight: 700,
                        fontFamily: '"Nunito", sans-serif',
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      Password must have:
                    </Typography>
                    <Grid container spacing={0.5}>
                      {['8+ characters', 'Uppercase', 'Number', 'Special char'].map((req, idx) => (
                        <Grid item xs={6} key={idx}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Box
                              sx={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                bgcolor: '#81c784',
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: '#546e7a', fontFamily: '"Nunito", sans-serif', fontSize: '0.65rem' }}
                            >
                              {req}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Summary */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#fafafa',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#1b5e20',
                        fontWeight: 700,
                        fontFamily: '"Nunito", sans-serif',
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      📋 Summary
                    </Typography>
                    <Stack spacing={0.5}>
                      {[
                        { label: 'Name', value: `${formData.firstName} ${formData.lastName}` },
                        { label: 'Email', value: formData.email },
                        { label: 'Username', value: formData.username },
                      ].map((item, idx) => (
                        <Stack key={idx} direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#9e9e9e', fontFamily: '"Nunito", sans-serif' }}>
                            {item.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#263238', fontWeight: 600, fontFamily: '"Nunito", sans-serif' }}
                          >
                            {item.value || '-'}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              )}

              {/* Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {activeStep > 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      flex: 1,
                      borderColor: '#c8e6c9',
                      color: '#1b5e20',
                      borderRadius: 2,
                      py: 1.2,
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': { borderColor: '#43a047', bgcolor: '#e8f5e9' },
                    }}
                  >
                    Back
                  </Button>
                )}

                {activeStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      flex: 1,
                      bgcolor: '#1b5e20',
                      color: '#fff',
                      borderRadius: 2,
                      py: 1.2,
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#2e7d32', boxShadow: '0 4px 12px rgba(27,94,32,0.3)' },
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={!loading && <SpaIcon />}
                    sx={{
                      flex: 1,
                      bgcolor: '#1b5e20',
                      color: '#fff',
                      borderRadius: 2,
                      py: 1.2,
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#2e7d32', boxShadow: '0 4px 12px rgba(27,94,32,0.3)' },
                      '&:disabled': { bgcolor: '#a5d6a7', color: '#fff' },
                    }}
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </Button>
                )}
              </Stack>
            </Box>

            {/* Sign In Link */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ flex: 1, height: 1, bgcolor: '#e0e0e0' }} />
              <Typography variant="caption" sx={{ color: '#9e9e9e', fontFamily: '"Nunito", sans-serif' }}>
                Have an account?
              </Typography>
              <Box sx={{ flex: 1, height: 1, bgcolor: '#e0e0e0' }} />
            </Stack>

            <Button
              component={Link}
              to="/auth/signin"
              fullWidth
              variant="text"
              sx={{
                mt: 2,
                color: '#1b5e20',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { bgcolor: '#e8f5e9' },
              }}
            >
              Sign In Instead
            </Button>

            {/* Terms */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: '#9e9e9e',
                textAlign: 'center',
                mt: 2,
                fontFamily: '"Nunito", sans-serif',
                lineHeight: 1.5,
                fontSize: '0.65rem',
              }}
            >
              By creating an account, you agree to our{' '}
              <Box component={Link} to="/terms" sx={{ color: '#43a047', textDecoration: 'none' }}>
                Terms
              </Box>
              {' & '}
              <Box component={Link} to="/privacy" sx={{ color: '#43a047', textDecoration: 'none' }}>
                Privacy Policy
              </Box>
            </Typography>
          </Paper>

          {/* Plant Emojis */}
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
            {['🌱', '🌿', '🪴', '🌵', '🍃'].map((emoji, idx) => (
              <Box
                key={idx}
                sx={{
                  fontSize: '1.1rem',
                  opacity: 0.4,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': { opacity: 1, transform: 'scale(1.2)' },
                }}
              >
                {emoji}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;