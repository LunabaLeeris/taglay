import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1b5e20',
        color: '#a5d6a7',
        pt: 8,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.03)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.02)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 2,
                    bgcolor: 'rgba(165, 214, 167, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GrassIcon sx={{ color: '#81c784', fontSize: 26 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#fff',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 800,
                    letterSpacing: 0.5,
                  }}
                >
                  Plantina
                </Typography>
              </Stack>
              
              <Typography
                variant="body2"
                sx={{ 
                  color: '#a5d6a7', 
                  lineHeight: 1.8,
                  maxWidth: 280,
                }}
              >
                Your guide to creating a thriving indoor jungle. Discover plant care tips, 
                species guides, and everything you need to grow your green paradise.
              </Typography>

              {/* Plant Emoji Row */}
              <Stack direction="row" spacing={1.5}>
                {['🌿', '🪴', '🌱', '🍃', '🌵'].map((emoji, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {emoji}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="overline"
              sx={{
                color: '#81c784',
                fontWeight: 700,
                letterSpacing: 2,
                fontSize: '0.7rem',
                display: 'block',
                mb: 2.5,
              }}
            >
              EXPLORE
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Plant Guides', path: '/articles' },
                { label: 'About', path: '/about' },
                { label: 'Care Tips', path: '/articles' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: '#a5d6a7',
                    textDecoration: 'none',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      color: '#fff',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="overline"
              sx={{
                color: '#81c784',
                fontWeight: 700,
                letterSpacing: 2,
                fontSize: '0.7rem',
                display: 'block',
                mb: 2.5,
              }}
            >
              CATEGORIES
            </Typography>
            <Stack spacing={1.5}>
              {[
                'Indoor Plants',
                'Succulents',
                'Tropical',
                'Low Light',
                'Pet Friendly',
              ].map((category) => (
                <Typography
                  key={category}
                  component={Link}
                  to="/articles"
                  variant="body2"
                  sx={{
                    color: '#a5d6a7',
                    textDecoration: 'none',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#fff',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant="overline"
              sx={{
                color: '#81c784',
                fontWeight: 700,
                letterSpacing: 2,
                fontSize: '0.7rem',
                display: 'block',
                mb: 2.5,
              }}
            >
              GET IN TOUCH
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmailIcon sx={{ color: '#81c784', fontSize: 16 }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#a5d6a7' }}>
                  christianleelunaba@plantita.com
                </Typography>
              </Stack>
              
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhoneIcon sx={{ color: '#81c784', fontSize: 16 }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#a5d6a7' }}>
                  09**-***-****
                </Typography>
              </Stack>

              {/* Social Links */}
              <Box sx={{ pt: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#81c784',
                    fontWeight: 600,
                    display: 'block',
                    mb: 1.5,
                  }}
                >
                  Follow the journey
                </Typography>
                <Stack direction="row" spacing={1}>
                  {[
                    { icon: faInstagram, url: 'https://instagram.com', color: '#E4405F' },
                    { icon: faTiktok, url: 'https://tiktok.com', color: '#000' },
                    { icon: faFacebook, url: 'https://facebook.com', color: '#1877F2' },
                    { icon: faTwitter, url: 'https://twitter.com', color: '#1DA1F2' },
                  ].map((social, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        color: '#a5d6a7',
                        bgcolor: 'rgba(255,255,255,0.08)',
                        width: 38,
                        height: 38,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#fff',
                          bgcolor: '#43a047',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 12px rgba(67, 160, 71, 0.4)',
                        },
                      }}
                    >
                      <FontAwesomeIcon icon={social.icon} style={{ fontSize: 16 }} />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider 
          sx={{ 
            borderColor: 'rgba(255,255,255,0.08)', 
            my: 5,
          }} 
        />

        {/* Footer Bottom */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#81c784',
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            © {currentYear} Plantina. All rights reserved.
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="body2"
              sx={{
                color: '#81c784',
                fontFamily: '"Nunito", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              Made with
            </Typography>
            <SpaIcon sx={{ fontSize: 16, color: '#66bb6a' }} />
            <Typography
              variant="body2"
              sx={{
                color: '#81c784',
                fontFamily: '"Nunito", sans-serif',
              }}
            >
              for plant lovers
            </Typography>
            <Typography sx={{ ml: 0.5 }}>🌱</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Typography
              component={Link}
              to="/privacy"
              variant="body2"
              sx={{
                color: '#81c784',
                textDecoration: 'none',
                fontFamily: '"Nunito", sans-serif',
                '&:hover': { color: '#fff' },
              }}
            >
              Privacy
            </Typography>
            <Typography
              component={Link}
              to="/terms"
              variant="body2"
              sx={{
                color: '#81c784',
                textDecoration: 'none',
                fontFamily: '"Nunito", sans-serif',
                '&:hover': { color: '#fff' },
              }}
            >
              Terms
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;