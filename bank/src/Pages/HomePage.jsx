import React, { useContext } from 'react';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UsersContext.jsx'; // adjust import path as needed

function HomePage() {
  const { loggedInUserId } = useContext(UserContext);

  return (
    <Container>
      <Card sx={{ marginTop: 5, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Welcome to Our Bank
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Discover a banking experience tailored for your financial needs. Our bank offers competitive rates, secure online banking, and a range of services designed to make your financial management easy and effective. Join us today and take advantage of our innovative account management tools, personalized customer service, and more.
          </Typography>
          {!loggedInUserId && (
            <Box textAlign="center">
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                Not a member yet? Create an account today and start enjoying the benefits.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/signup">
                Sign Up Now
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default HomePage;
