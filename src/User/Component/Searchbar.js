import React, { useState, useRef } from 'react';
import {
  Stack,
  Paper,
  InputBase,
  IconButton,
  Box,
  Badge,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Image as ImageIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const ProductSearch = ({ onTextSearch, onImageSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleTextSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onTextSearch) {
      onTextSearch(e.target.value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        if (onImageSearch) {
          onImageSearch(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      onTextSearch(" ")
    }
    // Reset lại tìm kiếm bằng text
    
    if (onTextSearch && searchQuery) {
      onTextSearch(searchQuery);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Stack direction="row" justifyContent="center" mt={3} mb={3}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      <Paper
        component="form"
        sx={{
          p: '2px 10px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: '#f5f5f5'
        }}
      >
        {previewImage ? (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            badgeContent={
              <IconButton 
                size="small" 
                onClick={handleRemoveImage}
                sx={{ 
                  backgroundColor: 'grey.200',
                  '&:hover': { backgroundColor: 'grey.300' },
                  padding: '2px'
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <Avatar 
              src={previewImage} 
              sx={{ 
                width: 32, 
                height: 32,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={triggerFileInput}
            />
          </Badge>
        ) : (
          <SearchIcon color="action" />
        )}

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={previewImage ? "Đang tìm kiếm bằng hình ảnh..." : "Tìm kiếm sản phẩm..."}
          value={previewImage ? '' : searchQuery}
          onChange={handleTextSearch}
          disabled={!!previewImage}
        />

        {!previewImage && (
          <Tooltip title="Tìm kiếm bằng hình ảnh">
            <IconButton onClick={triggerFileInput}>
              <ImageIcon color="action" />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </Stack>
  );
};

export default ProductSearch;