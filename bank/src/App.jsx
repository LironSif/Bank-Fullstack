import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './Pages/HomePage.jsx';
import UserDetailsPage from './Pages/UserTransctionPage.jsx';
import TransactionsPage from './Pages/TransactionsPage.jsx';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx'; // Import the SignUpPage

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navigation />
        <Box component="main" flexGrow={1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-details" element={<UserDetailsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} /> 
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
