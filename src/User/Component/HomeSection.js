import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import image1 from '../../Image/man-symbol.png'
import image2 from "../../Image/woman-symbol.png"
const SectionContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff6f1',
  padding: theme.spacing(8, 4),
  marginTop:'-50px',
  textAlign: 'center',
  position: 'relative',
  maxWidth: '800px',
  // margin: '0 auto',
  marginLeft:'auto',
  marginRight:'auto',
  marginTop:'-10%',
  fontFamily: '"Arial", sans-serif',
  overflow: 'hidden', // Ẩn phần thừa của đường viền cong
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50px',
    left: 0,
    right: 0,
    height: '100px',
    backgroundColor: '#fff6f1',
    borderBottomLeftRadius: '50%',
    borderBottomRightRadius: '50%',
    border: '3px solid #000',
    borderTop: 'none',
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-50px',
    left: 0,
    right: 0,
    height: '100px',
    backgroundColor: '#fff6f1',
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    border: '3px solid #000',
    borderBottom: 'none',
    zIndex: 1
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#000',
  marginBottom: theme.spacing(3),
  fontSize: '2rem',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  paddingTop: theme.spacing(4),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: '#000',
  marginBottom: theme.spacing(6),
  fontSize: '1.1rem',
  letterSpacing: '1px',
}));

const CircleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: theme.spacing(6),
}));

const Circle = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  border: '3px solid #000',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    '& .circle-text': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '& img': {
      filter: 'brightness(0.7)',
    }
  },
}));

const CircleImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'all 0.3s ease',
}));

const CircleText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textTransform: 'uppercase',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.3s ease',
  textShadow: '0 2px 5px rgba(0,0,0,0.8)',
  zIndex: 2,
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  color: '#000',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  fontSize: '1.2rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100px',
    height: '2px',
    backgroundColor: '#000',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

const ClothingSection = () => {
  return (
    <SectionContainer>
      {/* Đường viền trên */}
      <Title variant="h2">WHAT ARE YOU LOOKING FOR?</Title>
      
      <Subtitle variant="body1">
    
      </Subtitle>
      
      <CircleContainer>
        <Circle>
          <CircleImage 
            src={image1} 
            alt="Man Clothing" 
          />
          <CircleText className="circle-text">MAN CLOTHING</CircleText>
        </Circle>
        
        <Circle>
          <CircleImage 
            src={image2}
            alt="Woman Clothing" 
          />
          <CircleText className="circle-text">WOMAN CLOTHING</CircleText>
        </Circle>
      </CircleContainer>
      
      <FooterText>
       
      </FooterText>
    </SectionContainer>
  );
};

export default ClothingSection;