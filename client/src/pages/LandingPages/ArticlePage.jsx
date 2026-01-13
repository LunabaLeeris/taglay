import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleByName } from '../../services/ArticleService';
import NotFoundPage from '../NotFoundPage.jsx';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  Paper,
  CircularProgress,
  Divider,
  Avatar,
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import GrassIcon from '@mui/icons-material/Grass';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import YardIcon from '@mui/icons-material/Yard';

// Base URL for images
const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        setError('');
        const { data } = await fetchArticleByName(name);
        const fetchedArticle = data?.article;
        if (fetchedArticle && fetchedArticle.isActive !== false) {
          setArticle(fetchedArticle);
        } else {
          setArticle(null);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          setArticle(null);
        } else {
          console.error('Error loading article', err);
          setError('Unable to load this article right now.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [name]);

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
              size={60}
              thickness={2}
              sx={{ color: '#43a047' }}
            />
            <GrassIcon
              sx={{
                position: 'absolute',
                color: '#1b5e20',
                fontSize: 28,
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: '#546e7a',
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            Growing your content...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // Error State
  if (error) {
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
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
            maxWidth: 400,
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
            Oops! Something wilted
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#546e7a',
              mb: 3,
              fontFamily: '"Nunito", sans-serif',
            }}
          >
            {error}
          </Typography>
          <Button
            component={Link}
            to="/articles"
            variant="contained"
            sx={{
              bgcolor: '#1b5e20',
              color: '#fff',
              borderRadius: 2,
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#2e7d32',
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Back to Garden
          </Button>
        </Paper>
      </Box>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const contentArray = Array.isArray(article.content)
    ? article.content
    : article.content
      ? [article.content]
      : [];

  const words = contentArray.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 70));

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Floating Back Button - Always Visible */}
      <Button
        component={Link}
        to="/articles"
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'fixed',
          top: 90,
          left: 20,
          zIndex: 100,
          bgcolor: '#fff',
          color: '#1b5e20',
          borderRadius: 2,
          px: 2,
          py: 1,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 600,
          display: { xs: 'none', md: 'flex' },
          '&:hover': {
            bgcolor: '#e8f5e9',
          },
        }}
      >
        All Guides
      </Button>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#1b5e20',
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {article.image ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: { xs: 350, md: 500 },
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            {/* Image with Overlay */}
            <Box
              component="img"
              src={`${BASE_URL}${article.image}`}
              alt={article.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Dark Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(
                  to bottom,
                  rgba(27, 94, 32, 0.3) 0%,
                  rgba(27, 94, 32, 0.6) 50%,
                  rgba(27, 94, 32, 0.95) 100%
                )`,
              }}
            />

            {/* Mobile Back Button */}
            <Button
              component={Link}
              to="/articles"
              startIcon={<ArrowBackIcon />}
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: 'rgba(255,255,255,0.95)',
                color: '#1b5e20',
                borderRadius: 2,
                px: 2,
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                display: { xs: 'flex', md: 'none' },
                '&:hover': {
                  bgcolor: '#fff',
                },
              }}
            >
              Back
            </Button>

            {/* Hero Content */}
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, pb: 5 }}>
              <Stack spacing={3}>
                {/* Meta Info */}
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Chip
                    icon={<SpaIcon sx={{ fontSize: 16, color: '#1b5e20 !important' }} />}
                    label="Plant Guide"
                    size="small"
                    sx={{
                      bgcolor: '#a5d6a7',
                      color: '#1b5e20',
                      fontWeight: 700,
                      fontFamily: '"Nunito", sans-serif',
                    }}
                  />
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 16, color: '#a5d6a7' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#a5d6a7',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      {minutes} min read
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <MenuBookIcon sx={{ fontSize: 16, color: '#a5d6a7' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#a5d6a7',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      {words} words
                    </Typography>
                  </Stack>
                </Stack>

                {/* Title */}
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1.2,
                    maxWidth: 700,
                  }}
                >
                  {article.title}
                </Typography>

                {/* Author Info */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: '#43a047',
                      width: 44,
                      height: 44,
                    }}
                  >
                    <LocalFloristIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#fff',
                        fontWeight: 600,
                        fontFamily: '"Nunito", sans-serif',
                      }}
                    >
                      Plantina
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#a5d6a7',
                        fontFamily: '"Nunito", sans-serif',
                      }}
                    >
                      Plant Care Guide
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Container>
          </Box>
        ) : (
          // Fallback Hero without Image
          <Box sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
            {/* Decorative Elements */}
            <Box sx={{ position: 'absolute', top: 20, right: 40, opacity: 0.1 }}>
              <YardIcon sx={{ fontSize: 150, color: '#fff' }} />
            </Box>

            <Container maxWidth="md">
              {/* Mobile Back Button */}
              <Button
                component={Link}
                to="/articles"
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: '#a5d6a7',
                  mb: 3,
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  display: { xs: 'flex', md: 'none' },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Back to Guides
              </Button>

              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Chip
                    icon={<SpaIcon sx={{ fontSize: 16, color: '#1b5e20 !important' }} />}
                    label="Plant Guide"
                    size="small"
                    sx={{
                      bgcolor: '#a5d6a7',
                      color: '#1b5e20',
                      fontWeight: 700,
                      fontFamily: '"Nunito", sans-serif',
                    }}
                  />
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 16, color: '#a5d6a7' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#a5d6a7',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      {minutes} min read
                    </Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1.2,
                    maxWidth: 700,
                  }}
                >
                  {article.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#43a047', width: 44, height: 44 }}>
                    <LocalFloristIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: '#fff', fontWeight: 600, fontFamily: '"Nunito", sans-serif' }}
                    >
                      Plantina
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#a5d6a7', fontFamily: '"Nunito", sans-serif' }}
                    >
                      Plant Care Guide
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Container>
          </Box>
        )}
      </Box>

      {/* Quick Info Bar */}
      <Box sx={{ bgcolor: '#e8f5e9', py: 2, borderBottom: '1px solid', borderColor: '#c8e6c9' }}>
        <Container maxWidth="md">
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            divider={
              <Divider orientation="vertical" flexItem sx={{ borderColor: '#a5d6a7' }} />
            }
          >
            {[
              { icon: <WbSunnyIcon sx={{ fontSize: 20 }} />, label: 'Light Guide', color: '#f9a825' },
              { icon: <WaterDropIcon sx={{ fontSize: 20 }} />, label: 'Watering Tips', color: '#1976d2' },
              { icon: <SpaIcon sx={{ fontSize: 20 }} />, label: 'Care Level', color: '#43a047' },
            ].map((item, idx) => (
              <Stack
                key={idx}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              >
                <Box sx={{ color: item.color }}>{item.icon}</Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1b5e20',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Article Content */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 280px' },
            gap: 4,
          }}
        >
          {/* Main Content */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              bgcolor: '#fff',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {/* Article Body */}
            <Box sx={{ mb: 4 }}>
              {contentArray.map((paragraph, idx) => (
                <Typography
                  key={`${article.name}-${idx}`}
                  variant="body1"
                  sx={{
                    color: '#37474f',
                    lineHeight: 2,
                    fontSize: '1.1rem',
                    fontFamily: '"Nunito", sans-serif',
                    mb: 3,
                    '&:first-of-type::first-letter': {
                      fontSize: '3.5rem',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 600,
                      color: '#1b5e20',
                      float: 'left',
                      lineHeight: 1,
                      mr: 2,
                      mt: 0.5,
                    },
                    '&:last-child': {
                      mb: 0,
                    },
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>

            {/* Leaf Divider */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 4 }}>
              <Divider sx={{ flex: 1, borderColor: '#c8e6c9' }} />
              <SpaIcon sx={{ color: '#81c784', fontSize: 24 }} />
              <Divider sx={{ flex: 1, borderColor: '#c8e6c9' }} />
            </Stack>

            {/* Tags Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#1b5e20',
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: 'block',
                  mb: 2,
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                RELATED TOPICS
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {['Indoor Plants', 'Plant Care', 'Beginner Friendly'].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: '#e8f5e9',
                      color: '#1b5e20',
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#c8e6c9',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Bottom CTA Section */}
      <Box
        sx={{
          bgcolor: '#e8f5e9',
          py: { xs: 6, md: 8 },
          borderTop: '1px solid',
          borderColor: '#c8e6c9',
        }}
      >
        <Container maxWidth="md">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                {['🌱', '🌿', '🪴'].map((emoji, idx) => (
                  <Typography key={idx} sx={{ fontSize: '1.5rem' }}>
                    {emoji}
                  </Typography>
                ))}
              </Stack>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  color: '#1b5e20',
                  fontWeight: 600,
                }}
              >
                Enjoyed this guide?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#546e7a',
                  fontFamily: '"Nunito", sans-serif',
                  maxWidth: 400,
                }}
              >
                Learn more about my plant journey and discover the story behind Plantina.
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={Link}
                to="/about"
                variant="contained"
                size="large"
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
              >
                About Me
              </Button>
              <Button
                component={Link}
                to="/articles"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#1b5e20',
                  color: '#1b5e20',
                  borderRadius: 2,
                  px: 4,
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#fff',
                    borderColor: '#1b5e20',
                  },
                }}
              >
                More Guides
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default ArticlePage;