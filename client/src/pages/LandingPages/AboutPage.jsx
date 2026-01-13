import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import YardIcon from '@mui/icons-material/Yard';
import ParkIcon from '@mui/icons-material/Park';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';

function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.3)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.2)',
          }}
        />
        {/* Floating Leaves */}
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            left: 60,
            opacity: 0.1,
          }}
        >
          <LocalFloristIcon sx={{ fontSize: 120, color: '#1b5e20' }} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            right: 80,
            opacity: 0.1,
          }}
        >
          <YardIcon sx={{ fontSize: 100, color: '#1b5e20' }} />
        </Box>

        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Chip
              icon={<SpaIcon />}
              label="About Plantina"
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                color: '#1b5e20',
                fontWeight: 600,
                fontFamily: '"Nunito", sans-serif',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 600,
                color: '#1b5e20',
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              Welcome to My Green Corner
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#2e7d32',
                maxWidth: 600,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                fontFamily: '"Nunito", sans-serif',
              }}
            >
              Plantina is your guide to creating a thriving indoor jungle. Here, I share plant care tips, 
              species guides, and everything I've learned on my journey as a plant parent.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Profile Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: '#e8f5e9',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"
                alt="Plant lover tending to plants"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 3,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: '#1b5e20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(27, 94, 32, 0.3)',
                }}
              >
                <GrassIcon sx={{ color: '#a5d6a7', fontSize: 36 }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Chip
                label="MY STORY"
                sx={{
                  bgcolor: '#e8f5e9',
                  color: '#1b5e20',
                  fontWeight: 700,
                  width: 'fit-content',
                  letterSpacing: 1,
                  fontFamily: '"Nunito", sans-serif',
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                  color: '#263238',
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                From Plant Killer to Plant Parent
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  color: '#546e7a', 
                  lineHeight: 1.8,
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                My journey into the plant world started with a dying succulent on my windowsill. 
                After killing more plants than I'd like to admit, I became obsessed with understanding 
                what makes them thrive. Now, my home is filled with over 50 happy plants!
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  color: '#546e7a', 
                  lineHeight: 1.8,
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                Whether you're a complete beginner or a seasoned plant collector, I hope my guides 
                and tips help you build the indoor jungle of your dreams. Remember, every plant 
                parent has killed a few along the way — it's all part of the journey! 🌱
              </Typography>

              {/* Stats */}
              <Stack direction="row" spacing={4} sx={{ pt: 3 }}>
                {[
                  { number: '50+', label: 'Plants Owned', emoji: '🪴' },
                  { number: '4+', label: 'Years Growing', emoji: '🌱' },
                  { number: '120+', label: 'Species Studied', emoji: '🌿' },
                ].map((stat, index) => (
                  <Box key={index} textAlign="center">
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 800,
                        color: '#43a047',
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#546e7a',
                          fontFamily: '"Nunito", sans-serif',
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography>{stat.emoji}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
<Box sx={{ bgcolor: '#e8f5e9', py: { xs: 6, md: 8 } }}>
  <Container maxWidth="lg">
    <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
      <Chip
        icon={<EnergySavingsLeafIcon />}
        label="WHAT I BELIEVE"
        sx={{
          bgcolor: '#fff',
          color: '#1b5e20',
          fontWeight: 700,
          letterSpacing: 1,
          fontFamily: '"Nunito", sans-serif',
        }}
      />
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 600,
          color: '#1b5e20',
          fontSize: { xs: '1.75rem', md: '2.25rem' },
        }}
      >
        My Plant Philosophy
      </Typography>
    </Stack>

    {/* Single Row Container */}
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={3}
      justifyContent="center"
      alignItems="stretch"
      sx={{ maxWidth: 900, mx: 'auto' }}
    >
      {[
        {
          icon: <VolunteerActivismIcon sx={{ fontSize: 28 }} />,
          title: 'Patience is Key',
          description: 'Plants grow on their own timeline. Be patient and observant.',
          color: '#43a047',
          bgColor: '#e8f5e9',
        },
        {
          icon: <WaterDropIcon sx={{ fontSize: 28 }} />,
          title: 'Less is More',
          description: 'Overwatering kills more plants than underwatering.',
          color: '#1976d2',
          bgColor: '#e3f2fd',
        },
        {
          icon: <WbSunnyIcon sx={{ fontSize: 28 }} />,
          title: 'Right Plant, Right Place',
          description: 'Every plant has a perfect spot. Let\'s find yours!',
          color: '#f9a825',
          bgColor: '#fff8e1',
        },
      ].map((value, index) => (
        <Card
          key={index}
          sx={{
            flex: 1,
            minWidth: { xs: '100%', md: 260 },
            maxWidth: { xs: '100%', md: 280 },
            textAlign: 'center',
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: '0 8px 24px rgba(27, 94, 32, 0.12)',
              borderColor: value.color,
            },
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: value.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              color: value.color,
            }}
          >
            {value.icon}
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Nunito", sans-serif',
              color: '#263238',
              mb: 1,
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            {value.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#546e7a',
              fontFamily: '"Nunito", sans-serif',
              lineHeight: 1.6,
              fontSize: '0.85rem',
            }}
          >
            {value.description}
          </Typography>
        </Card>
      ))}
    </Stack>
  </Container>
</Box>

      {/* Journey Timeline */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
          <Chip
            icon={<ParkIcon />}
            label="MY JOURNEY"
            sx={{
              bgcolor: '#e8f5e9',
              color: '#1b5e20',
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: '"Nunito", sans-serif',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 600,
              color: '#1b5e20',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            How My Garden Grew
          </Typography>
        </Stack>

        <Stack spacing={0}>
          {[
            {
              year: '2020',
              title: 'The First Leaf',
              description:
                'Bought my first plant during lockdown — a small pothos that somehow survived my neglect. That little vine sparked something in me.',
              emoji: '🌱',
            },
            {
              year: '2021',
              title: 'The Learning Curve',
              description:
                'Killed a lot of plants this year. But each loss taught me something new about light, water, and the importance of drainage holes.',
              emoji: '📚',
            },
            {
              year: '2022',
              title: 'The Passion Begins',
              description:
                'Started propagating, collecting rare species, and joining plant communities. My windowsills were officially full.',
              emoji: '🪴',
            },
            {
              year: '2023',
              title: 'Plantina is Born',
              description:
                'Launched this blog to share everything I\'ve learned. Turns out, other people wanted to hear about root rot too!',
              emoji: '🌿',
            },
            {
              year: 'Now',
              title: 'Growing Together',
              description:
                'Still learning every day, expanding my collection, and helping fellow plant parents create their own green spaces.',
              emoji: '🌳',
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 3,
                position: 'relative',
                pb: 4,
              }}
            >
              {/* Timeline Line */}
              {index < 4 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 35,
                    top: 72,
                    width: 2,
                    height: 'calc(100% - 50px)',
                    background: 'linear-gradient(to bottom, #43a047, #81c784)',
                  }}
                />
              )}

              {/* Year Circle */}
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  bgcolor: '#1b5e20',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                  boxShadow: '0 4px 12px rgba(27, 94, 32, 0.3)',
                }}
              >
                <Typography sx={{ fontSize: '1.2rem' }}>{item.emoji}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#a5d6a7',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  {item.year}
                </Typography>
              </Box>

              {/* Content */}
              <Box 
                sx={{ 
                  pt: 1,
                  pb: 2,
                  pl: 2,
                  borderLeft: index < 4 ? 'none' : 'none',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Nunito", sans-serif',
                    color: '#263238',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#546e7a', 
                    lineHeight: 1.7,
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>

     {/* Plant Collection Showcase */}
<Box sx={{ bgcolor: '#f5f5f5', py: { xs: 6, md: 8 } }}>
  <Container maxWidth="lg">
    <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 600,
          color: '#1b5e20',
        }}
      >
        Some of My Plant Family
      </Typography>
    </Stack>
    
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      {[
        { name: 'Monstera', emoji: '🌿', care: 'Moderate' },
        { name: 'Pothos', emoji: '🪴', care: 'Easy' },
        { name: 'Fiddle Leaf', emoji: '🌳', care: 'Demanding' },
        { name: 'Snake Plant', emoji: '🌵', care: 'Easy' },
        { name: 'Calathea', emoji: '🍃', care: 'Tricky' },
      ].map((plant, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            width: 130,
            textAlign: 'center',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              borderColor: '#43a047',
              transform: 'scale(1.05)',
            },
          }}
        >
          <Typography sx={{ fontSize: '2rem', mb: 1 }}>{plant.emoji}</Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              color: '#263238',
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            {plant.name}
          </Typography>
          <Chip
            label={plant.care}
            size="small"
            sx={{
              mt: 1,
              fontSize: '0.65rem',
              height: 20,
              bgcolor: plant.care === 'Easy' ? '#e8f5e9' : 
                       plant.care === 'Moderate' ? '#fff8e1' : '#ffebee',
              color: plant.care === 'Easy' ? '#2e7d32' : 
                     plant.care === 'Moderate' ? '#f57f17' : '#c62828',
            }}
          />
        </Paper>
      ))}
    </Box>
  </Container>
</Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            right: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
            {['🌱', '🌿', '🪴', '🌵', '🍃'].map((emoji, idx) => (
              <Typography key={idx} sx={{ fontSize: '2rem' }}>{emoji}</Typography>
            ))}
          </Stack>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              color: '#fff',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Ready to Grow Together?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#a5d6a7',
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.8,
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            Whether you're just starting out or looking to expand your collection, 
            I'm here to help you become the plant parent you've always wanted to be.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/articles"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#fff',
                color: '#1b5e20',
                borderRadius: 2,
                px: 4,
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#e8f5e9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Explore Plant Guides
            </Button>
            <Button
              component="a"
              href="mailto:hello@plantina.com"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(165, 214, 167, 0.5)',
                color: '#fff',
                borderRadius: 2,
                px: 4,
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#a5d6a7',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
              startIcon={<EmailIcon />}
            >
              Say Hello
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutPage;