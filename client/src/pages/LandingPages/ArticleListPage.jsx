import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  CircularProgress,
  Paper,
  InputBase,
  IconButton,
  Grid,
} from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import YardIcon from '@mui/icons-material/Yard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ParkIcon from '@mui/icons-material/Park';

function ArticleListPage() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Indoor', 'Outdoor', 'Succulents', 'Tropical', 'Beginner'];

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles || []).filter((article) => article.isActive);
        setArticleList(activeArticles);
      } catch (err) {
        console.error('Error loading articles', err);
        setError('Unable to load articles right now.');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fafafa',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              size={70}
              thickness={2}
              sx={{ color: '#43a047' }}
            />
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SpaIcon sx={{ color: '#1b5e20', fontSize: 28 }} />
            </Box>
          </Box>
          <Stack spacing={0.5} alignItems="center">
            <Typography
              variant="body1"
              sx={{
                color: '#1b5e20',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
              }}
            >
              Growing your garden...
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#546e7a',
                fontFamily: '"Nunito", sans-serif',
              }}
            >
              Loading plant guides
            </Typography>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1b5e20',
          pt: { xs: 6, md: 8 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
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
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 40,
            opacity: 0.08,
          }}
        >
          <LocalFloristIcon sx={{ fontSize: 180, color: '#fff' }} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: -20,
            right: 60,
            opacity: 0.08,
          }}
        >
          <YardIcon sx={{ fontSize: 200, color: '#fff' }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Chip
                  icon={<GrassIcon sx={{ color: '#1b5e20 !important', fontSize: 18 }} />}
                  label="Plant Care Library"
                  sx={{
                    bgcolor: '#a5d6a7',
                    color: '#1b5e20',
                    fontWeight: 700,
                    fontFamily: '"Nunito", sans-serif',
                    width: 'fit-content',
                    py: 0.5,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                  }}
                >
                  Grow Your
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      color: '#a5d6a7',
                    }}
                  >
                    Plant Knowledge
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#c8e6c9',
                    maxWidth: 500,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  Browse our collection of detailed plant guides, care tips, and expert advice
                  to help your indoor garden thrive.
                </Typography>

                {/* Stats */}
                <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                  {[
                    { number: articleList.length || '50+', label: 'Guides' },
                    { number: '120+', label: 'Species' },
                    { number: '4.9', label: 'Rating' },
                  ].map((stat, idx) => (
                    <Box key={idx}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: '#fff',
                          fontWeight: 800,
                          fontFamily: '"Nunito", sans-serif',
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body2"
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
              </Stack>
            </Grid>

            {/* Quick Category Cards */}
            <Grid item xs={12} md={5}>
              <Stack spacing={2}>
                {[
                  { icon: <WbSunnyIcon />, title: 'Low Light Plants', count: 12, color: '#fff8e1' },
                  { icon: <WaterDropIcon />, title: 'Easy to Water', count: 18, color: '#e3f2fd' },
                  { icon: <SpaIcon />, title: 'Air Purifying', count: 15, color: '#e8f5e9' },
                ].map((category, idx) => (
                  <Paper
                    key={idx}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.1)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: 1.5,
                        bgcolor: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1b5e20',
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#fff',
                          fontWeight: 600,
                          fontFamily: '"Nunito", sans-serif',
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#a5d6a7',
                          fontFamily: '"Nunito", sans-serif',
                        }}
                      >
                        {category.count} guides
                      </Typography>
                    </Box>
                    <ArrowForwardIcon sx={{ color: '#a5d6a7', fontSize: 20 }} />
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search & Filter Bar */}
      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: '#fff',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent="space-between"
          >
            {/* Search Input */}
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: '#f5f5f5',
                border: '1px solid transparent',
                flex: 1,
                maxWidth: { md: 350 },
                transition: 'all 0.2s ease',
                '&:focus-within': {
                  borderColor: '#43a047',
                  bgcolor: '#fff',
                },
              }}
              elevation={0}
            >
              <SearchIcon sx={{ color: '#9e9e9e', mr: 1 }} />
              <InputBase
                placeholder="Search plant guides..."
                sx={{
                  flex: 1,
                  fontFamily: '"Nunito", sans-serif',
                  '& input': {
                    p: 0,
                  },
                }}
              />
            </Paper>

            {/* Filter Chips */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                overflowX: 'auto',
                pb: { xs: 1, md: 0 },
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {filters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onClick={() => setActiveFilter(filter)}
                  sx={{
                    bgcolor: activeFilter === filter ? '#1b5e20' : '#f5f5f5',
                    color: activeFilter === filter ? '#fff' : '#546e7a',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: activeFilter === filter ? '#1b5e20' : 'transparent',
                    '&:hover': {
                      bgcolor: activeFilter === filter ? '#2e7d32' : '#e8f5e9',
                    },
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* Articles Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Section Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 600,
                color: '#1b5e20',
                mb: 0.5,
              }}
            >
              All Plant Guides
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#546e7a',
                fontFamily: '"Nunito", sans-serif',
              }}
            >
              {articleList.length} guides available
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterListIcon sx={{ color: '#546e7a', fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                color: '#546e7a',
                fontFamily: '"Nunito", sans-serif',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Sort by: Latest
            </Typography>
          </Stack>
        </Stack>

        {error ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 8,
              px: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: '#ffebee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: '2.5rem' }}>🥀</Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: '#263238',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Something went wrong
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#546e7a',
                fontFamily: '"Nunito", sans-serif',
                mb: 3,
              }}
            >
              {error}
            </Typography>
            <Button
              onClick={() => window.location.reload()}
              variant="contained"
              sx={{
                bgcolor: '#1b5e20',
                borderRadius: 2,
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                '&:hover': { bgcolor: '#2e7d32' },
              }}
            >
              Try Again
            </Button>
          </Paper>
        ) : articleList.length > 0 ? (
          <ArticleList articles={articleList} />
        ) : (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 10,
              px: 4,
              borderRadius: 3,
              bgcolor: '#e8f5e9',
              border: '2px dashed',
              borderColor: '#a5d6a7',
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                bgcolor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 4px 12px rgba(27, 94, 32, 0.1)',
              }}
            >
              <GrassIcon sx={{ fontSize: 50, color: '#43a047' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                color: '#1b5e20',
                fontWeight: 600,
                mb: 1,
              }}
            >
              The garden is empty
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#546e7a',
                fontFamily: '"Nunito", sans-serif',
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              We're planting new guides! Check back soon for fresh plant care content.
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Newsletter / CTA Section */}
      <Box sx={{ bgcolor: '#e8f5e9', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              bgcolor: '#fff',
              border: '1px solid',
              borderColor: '#c8e6c9',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
            }}
          >
            {/* Decorative Plant Icons */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: { xs: '100%', md: 200 },
              }}
            >
              {['🌱', '🌿', '🪴', '🌵', '🍃', '☘️'].map((emoji, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    bgcolor: '#e8f5e9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                  color: '#1b5e20',
                  mb: 1,
                }}
              >
                Curious about the Plant Parent?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#546e7a',
                  fontFamily: '"Nunito", sans-serif',
                  mb: 3,
                }}
              >
                Learn about my plant journey and discover the story behind Plantina.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  component={Link}
                  to="/about"
                  variant="contained"
                  sx={{
                    bgcolor: '#1b5e20',
                    color: '#fff',
                    borderRadius: 2,
                    px: 4,
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#2e7d32',
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  About Me
                </Button>
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  sx={{
                    borderColor: '#1b5e20',
                    color: '#1b5e20',
                    borderRadius: 2,
                    px: 4,
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#e8f5e9',
                      borderColor: '#1b5e20',
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default ArticleListPage;