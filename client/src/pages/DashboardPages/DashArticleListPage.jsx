import React, { useState, useEffect, useRef } from 'react';
import { fetchArticles, createArticle, updateArticle, toggleArticleStatus } from '../../services/ArticleService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
  Switch,
  IconButton,
  Paper,
  Chip,
  Avatar,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 600, md: 700 },
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: '#fff',
  borderRadius: 3,
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  p: 0,
};

const imagePreviewStyle = {
  width: '100%',
  maxHeight: 200,
  objectFit: 'cover',
  borderRadius: 2,
  border: '1px solid #e0e0e0',
};

const uploadBoxStyle = {
  border: '2px dashed #c8e6c9',
  borderRadius: 2,
  padding: 3,
  textAlign: 'center',
  cursor: 'pointer',
  bgcolor: '#f1f8e9',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#43a047',
    bgcolor: '#e8f5e9',
  },
};

const textFieldStyles = {
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
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    content: [],
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      name: '',
      title: '',
      content: [],
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle(articleToEdit);
      setEditArticleId(id);
      setIsEditing(true);
      setImageFile(null);
      if (articleToEdit.image) {
        setImagePreview(`${BASE_URL}${articleToEdit.image}`);
      } else {
        setImagePreview(null);
      }
      setOpen(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveArticle = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newArticle.name);
      formData.append('title', newArticle.title);
      formData.append('content', JSON.stringify(newArticle.content));
      formData.append('isActive', newArticle.isActive);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEditing) {
        await updateArticle(editArticleId, formData);
      } else {
        await createArticle(formData);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await toggleArticleStatus(id);
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        params.row.image ? (
          <Avatar
            variant="rounded"
            src={`${BASE_URL}${params.row.image}`}
            alt={params.row.name}
            sx={{
              width: 50,
              height: 50,
              border: '2px solid #e8f5e9',
            }}
          />
        ) : (
          <Avatar
            variant="rounded"
            sx={{
              width: 50,
              height: 50,
              bgcolor: '#e8f5e9',
              color: '#43a047',
            }}
          >
            <SpaIcon />
          </Avatar>
        )
      ),
    },
    {
      field: 'name',
      headerName: 'Slug',
      flex: 0.8,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Nunito", sans-serif',
            color: '#546e7a',
            fontWeight: 500,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1.5,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Nunito", sans-serif',
            color: '#263238',
            fontWeight: 600,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Switch
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row._id)}
            size="small"
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#43a047',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                bgcolor: '#a5d6a7',
              },
            }}
          />
          <Chip
            icon={params.row.isActive ? <CheckCircleIcon /> : <CancelIcon />}
            label={params.row.isActive ? 'Live' : 'Draft'}
            size="small"
            sx={{
              bgcolor: params.row.isActive ? '#e8f5e9' : '#fafafa',
              color: params.row.isActive ? '#2e7d32' : '#9e9e9e',
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 600,
              fontSize: '0.7rem',
              '& .MuiChip-icon': {
                color: params.row.isActive ? '#43a047' : '#bdbdbd',
                fontSize: 14,
              },
            }}
          />
        </Stack>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(params.row._id)}
          sx={{
            borderColor: '#c8e6c9',
            color: '#1b5e20',
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 1.5,
            '&:hover': {
              borderColor: '#43a047',
              bgcolor: '#e8f5e9',
            },
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                bgcolor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArticleIcon sx={{ color: '#43a047', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: '#1b5e20',
                }}
              >
                Plant Guides
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#546e7a',
                  fontFamily: '"Nunito", sans-serif',
                }}
              >
                Manage your plant care articles
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              icon={<GrassIcon />}
              label={`${articles.length} Articles`}
              sx={{
                bgcolor: '#e8f5e9',
                color: '#1b5e20',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#43a047' },
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleOpen}
              sx={{
                bgcolor: '#1b5e20',
                color: '#fff',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#2e7d32',
                  boxShadow: '0 4px 12px rgba(27, 94, 32, 0.3)',
                },
              }}
            >
              Add Guide
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Data Grid */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          rowHeight={70}
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 700,
              color: '#1b5e20',
              fontSize: '0.85rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f5f5f5',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: '#f1f8e9',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #e0e0e0',
              bgcolor: '#fafafa',
            },
            '& .MuiTablePagination-root': {
              fontFamily: '"Nunito", sans-serif',
            },
          }}
        />
      </Paper>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {/* Modal Header */}
          <Box
            sx={{
              p: 3,
              bgcolor: '#1b5e20',
              borderRadius: '12px 12px 0 0',
              position: 'relative',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isEditing ? (
                  <EditIcon sx={{ color: '#a5d6a7', fontSize: 24 }} />
                ) : (
                  <SpaIcon sx={{ color: '#a5d6a7', fontSize: 24 }} />
                )}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {isEditing ? 'Edit Plant Guide' : 'Create New Guide'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#a5d6a7',
                    fontFamily: '"Nunito", sans-serif',
                  }}
                >
                  {isEditing ? 'Update your article details' : 'Add a new plant care article'}
                </Typography>
              </Box>
            </Stack>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: '#a5d6a7',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Modal Body */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* Name & Title */}
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#1b5e20',
                    fontWeight: 700,
                    fontFamily: '"Nunito", sans-serif',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 1.5,
                  }}
                >
                  Basic Information
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="URL Slug"
                    placeholder="e.g., monstera-care-guide"
                    value={newArticle.name}
                    onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                    helperText="Used in the article URL (no spaces)"
                    sx={textFieldStyles}
                  />
                  <TextField
                    fullWidth
                    label="Article Title"
                    placeholder="e.g., Complete Monstera Care Guide"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    sx={textFieldStyles}
                  />
                </Stack>
              </Box>

              {/* Content */}
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#1b5e20',
                    fontWeight: 700,
                    fontFamily: '"Nunito", sans-serif',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 1.5,
                  }}
                >
                  Content
                </Typography>
                <TextField
                  fullWidth
                  label="Article Content"
                  placeholder="Write your plant care guide here... (Each paragraph on a new line)"
                  multiline
                  rows={6}
                  value={newArticle.content.join('\n')}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, content: e.target.value.split('\n') })
                  }
                  helperText="Separate paragraphs with new lines"
                  sx={textFieldStyles}
                />
              </Box>

              {/* Image Upload */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: '#1b5e20',
                      fontWeight: 700,
                      fontFamily: '"Nunito", sans-serif',
                      letterSpacing: 1,
                    }}
                  >
                    Cover Image
                  </Typography>
                  <Chip
                    label="Optional"
                    size="small"
                    sx={{
                      bgcolor: '#fff8e1',
                      color: '#f57f17',
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 600,
                      fontSize: '0.65rem',
                    }}
                  />
                </Stack>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />

                {imagePreview ? (
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={imagePreviewStyle}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        '&:hover': { bgcolor: '#fff' },
                      }}
                    >
                      <DeleteIcon sx={{ color: '#c62828' }} />
                    </IconButton>
                    <Chip
                      icon={<ImageIcon />}
                      label="Image attached"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: '#43a047' },
                      }}
                    />
                  </Box>
                ) : (
                  <Box sx={uploadBoxStyle} onClick={handleUploadClick}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: '#e8f5e9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <CloudUploadIcon sx={{ fontSize: 30, color: '#43a047' }} />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#1b5e20',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Click to upload an image
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#546e7a',
                        fontFamily: '"Nunito", sans-serif',
                      }}
                    >
                      JPEG, PNG, GIF, or WebP (max 5MB)
                    </Typography>
                  </Box>
                )}
              </Box>
            </Stack>
          </Box>

          {/* Modal Footer */}
          <Box
            sx={{
              p: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: '#fafafa',
              borderRadius: '0 0 12px 12px',
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderColor: '#e0e0e0',
                  color: '#546e7a',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    borderColor: '#bdbdbd',
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveArticle}
                startIcon={isEditing ? <EditIcon /> : <AddCircleIcon />}
                sx={{
                  bgcolor: '#1b5e20',
                  color: '#fff',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#2e7d32',
                    boxShadow: '0 4px 12px rgba(27, 94, 32, 0.3)',
                  },
                }}
              >
                {isEditing ? 'Save Changes' : 'Create Guide'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default DashArticleListPage;