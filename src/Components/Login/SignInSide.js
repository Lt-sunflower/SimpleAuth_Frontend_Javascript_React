import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Grid } from '@mui/material';
import LoginTabs from './Tabs';

export default function SignInSide() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={6}
        md={8}
        sx={{
          backgroundImage: 'url("/login-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      />
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        component={Paper}
        elevation={6}
        sx={{ backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column' }}
        square
      >
        <Box
          sx={{
            my: 4,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <LoginTabs />
        </Box>
      </Grid>
    </Grid>
  );
}
