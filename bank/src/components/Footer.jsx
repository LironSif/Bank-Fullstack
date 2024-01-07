import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'primary.main', // Example background color
        color: 'white', // Text color
        py: 2, // Padding top & bottom
        mt: 'auto', // Margin top auto for pushing it to the bottom
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Sifadotec Banking Solutions ™
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
