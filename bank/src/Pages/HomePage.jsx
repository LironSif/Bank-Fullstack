import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Card sx={{ marginTop: 5 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Welcome to Our Bank
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default HomePage;
