import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../services/ArticleService';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import GrassIcon from '@mui/icons-material/Grass';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SpaIcon from '@mui/icons-material/Spa';
import ParkIcon from '@mui/icons-material/Park';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Base URL for images
const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

// Custom Plant Theme - Earth & Botanical
const plantTheme = createTheme({
  palette: {
    primary: {
      light: '#e8f5e9',
      main: '#43a047',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff8e1',
      main: '#8d6e63',
      dark: '#4e342e',
      contrastText: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#263238',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Nunito", sans-serif',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Nunito", sans-serif',
    },
    button: {
      fontFamily: '"Nunito", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },
  },
});

function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles || [])
          .filter((article) => article.isActive)
          .slice(0, 3);
        setFeaturedArticles(activeArticles);
      } catch (err) {
        console.error('Error loading articles', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <ThemeProvider theme={plantTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        
        {/* Hero Section - Split Design */}
        <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
          <Container maxWidth="xl">
            <Grid container spacing={0} alignItems="stretch">
              {/* Left Content */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    pr: { md: 8 },
                    py: { xs: 6, md: 10 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Stack spacing={4}>
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: '#43a047',
                          fontWeight: 700,
                          letterSpacing: 3,
                          fontSize: '0.75rem',
                        }}
                      >
                        PLANT CARE & BOTANICAL LIVING
                      </Typography>
                    </Box>
                    
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '2.75rem', md: '4rem', lg: '4.5rem' },
                        color: '#263238',
                        lineHeight: 1.1,
                      }}
                    >
                      Bring Nature
                      <Box 
                        component="span" 
                        sx={{ 
                          color: '#43a047',
                          display: 'block',
                        }}
                      >
                        Into Your Home
                      </Box>
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.1rem',
                        color: 'text.secondary',
                        maxWidth: 480,
                      }}
                    >
                      Expert plant care guides, propagation tips, and everything you need 
                      to create your own indoor jungle. Let's grow together.
                    </Typography>
                    
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                      <Button
                        component={Link}
                        to="/articles"
                        variant="contained"
                        size="large"
                        sx={{
                          bgcolor: '#1b5e20',
                          px: 4,
                          py: 1.5,
                          '&:hover': { bgcolor: '#145214' },
                        }}
                        endIcon={<ArrowForwardIcon />}
                      >
                        Explore Guides
                      </Button>
                      <Button
                        component={Link}
                        to="/about"
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: '#263238',
                          borderWidth: 2,
                          color: '#263238',
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            borderWidth: 2,
                            borderColor: '#1b5e20',
                            color: '#1b5e20',
                            bgcolor: 'transparent',
                          },
                        }}
                      >
                        My Story
                      </Button>
                    </Stack>

                    {/* Mini Stats Row */}
                    <Stack 
                      direction="row" 
                      spacing={4} 
                      sx={{ 
                        pt: 6,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {[
                        { number: '120+', label: 'Plant Species' },
                        { number: '50+', label: 'Care Guides' },
                        { number: '10K', label: 'Plant Parents' },
                      ].map((stat, idx) => (
                        <Box key={idx}>
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              color: '#43a047', 
                              fontWeight: 700,
                              fontFamily: '"Nunito", sans-serif',
                            }}
                          >
                            {stat.number}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Grid>

      {/* Right Image Grid */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 2,
            height: { xs: 400, md: '80vh' },
            maxHeight: 600,
          }}
        >
          {/* Left Image - Full Height */}
          <Box
            sx={{
              gridRow: 'span 2',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
           <Box
             component="img"
             src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80"
             alt="Monstera plant"
             sx={{
               width: '100%',
               height: '100%',
               objectFit: 'cover',
             }}
           />
         </Box>
     
         {/* Middle Top - Succulent Image */}
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: '#e8f5e9',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"
                alt="Succulent plants"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
        
            {/* Right Image - Full Height */}
            <Box
              sx={{
                gridRow: 'span 2',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80"
                alt="Indoor plants collection"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
        
            {/* Middle Bottom - Quote Box */}
            <Box
              sx={{
                borderRadius: 3,
                bgcolor: '#1b5e20',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}
            >
              <SpaIcon sx={{ fontSize: 40, color: '#a5d6a7', mb: 1 }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                "Where flowers bloom, so does hope."
              </Typography>
            </Box>
          </Box>
        </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Categories Section - Horizontal Cards */}
        <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{ 
                  color: 'text.primary', 
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  mb: 2,
                }}
              >
                Learn & Grow
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}
              >
                Everything you need to become a confident plant parent
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Featured Articles Section - Magazine Style */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
              sx={{ mb: 6 }}
            >
              <Box>
                <Chip
                  label="LATEST ARTICLES"
                  size="small"
                  sx={{
                    bgcolor: '#1b5e20',
                    color: '#fff',
                    mb: 2,
                    letterSpacing: 1,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{ color: 'text.primary', fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  Fresh From the Garden
                </Typography>
              </Box>
              <Button
                component={Link}
                to="/articles"
                variant="text"
                sx={{
                  color: '#43a047',
                  mt: { xs: 2, sm: 0 },
                  '&:hover': {
                    bgcolor: '#e8f5e9',
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                View All Articles
              </Button>
            </Stack>

            {isLoading ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <GrassIcon sx={{ fontSize: 48, color: '#43a047', mb: 2 }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  Growing content...
                </Typography>
              </Box>
            ) : featuredArticles.length > 0 ? (
              <Grid container spacing={4}>
                {featuredArticles.map((article, index) => {
                  const words = article.content.join(' ').split(' ').length;
                  const minutes = Math.max(2, Math.ceil(words / 70));
                  const isLarge = index === 0;

                  return (
                    <Grid item xs={12} md={isLarge ? 8 : 4} key={article.name}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: isLarge ? { xs: 'column', sm: 'row' } : 'column',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: 'none',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#43a047',
                            '& .article-image': {
                              transform: 'scale(1.05)',
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: isLarge ? { xs: '100%', sm: '50%' } : '100%',
                            height: isLarge ? { xs: 240, sm: 'auto' } : 200,
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          {article.image ? (
                            <CardMedia
                              className="article-image"
                              component="img"
                              image={`${BASE_URL}${article.image}`}
                              alt={article.title}
                              sx={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                              }}
                            />
                          ) : (
                            <Box
                              className="article-image"
                              sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: '#e8f5e9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.5s ease',
                              }}
                            >
                              <SpaIcon sx={{ fontSize: 48, color: '#43a047', opacity: 0.5 }} />
                            </Box>
                          )}
                        </Box>
                        <CardContent 
                          sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            flexDirection: 'column',
                            p: 3,
                          }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Chip
                              label="Plant Care"
                              size="small"
                              sx={{
                                bgcolor: '#e8f5e9',
                                color: '#1b5e20',
                                fontSize: '0.7rem',
                              }}
                            />
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {minutes} min
                              </Typography>
                            </Stack>
                          </Stack>
                          
                          <Typography
                            variant={isLarge ? 'h5' : 'h6'}
                            sx={{
                              color: 'text.primary',
                              mb: 2,
                              lineHeight: 1.3,
                            }}
                          >
                            {article.title}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: 'text.secondary', 
                              mb: 3,
                              flexGrow: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: isLarge ? 3 : 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {article.content[0]}
                          </Typography>
                          
                          <Button
                            component={Link}
                            to={`/articles/${article.name}`}
                            variant="text"
                            sx={{
                              color: '#43a047',
                              fontWeight: 600,
                              p: 0,
                              justifyContent: 'flex-start',
                              '&:hover': {
                                bgcolor: 'transparent',
                                '& .arrow': {
                                  transform: 'translateX(4px)',
                                },
                              },
                            }}
                          >
                            Read Article
                            <ArrowForwardIcon 
                              className="arrow"
                              sx={{ 
                                ml: 1, 
                                fontSize: 18,
                                transition: 'transform 0.2s ease',
                              }} 
                            />
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Paper
                sx={{
                  p: 6,
                  textAlign: 'center',
                  bgcolor: '#f5f5f5',
                  border: '2px dashed',
                  borderColor: 'divider',
                }}
              >
                <EnergySavingsLeafIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 2 }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  No articles planted yet. Check back soon!
                </Typography>
              </Paper>
            )}
          </Container>
        </Box> 
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;