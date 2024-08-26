import React, { useState } from 'react';
import { Button, TextField, Box, Grid, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../Context/UseAuth';
import { useLoading } from '../../Context/UseLoading';

function LoginTab() {
  const [loginError, setLoginError] = useState(false);
  const [alertText, setAlertText] = useState('');
  const { login, setToken } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var username = data.get('username');
    var password = data.get('password');
    var json = JSON.stringify({ username, password });

    showLoading();
    try {
      const response = await login(json);
      if (response.status === 400) {
        setLoginError(true);
        localStorage.setItem('authState', false);
        setAlertText('Wrong Username/Password');
      } else if (response.status === 200) {
        const responseText = await response.text();
        setToken(responseText);
        localStorage.setItem('authState', true);
        navigate('/home');
      } else {
        setLoginError(true);
        localStorage.setItem('authState', false);
        setAlertText('Server Error');
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
      setAlertText('Network Error');
      localStorage.setItem('authState', false);
    } finally {
      hideLoading();
    }
  };

  return (
    <div>
      {/* <input></input>
        <br/>
        <input></input>
        <br/>
        <button>submit</button> */}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />

        <FormControl variant="outlined" margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {/* <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid> */}

        <Box sx={{ mt: 2 }}>
          {loginError && (
            <Alert severity="error" variant="outlined">
              {alertText}
            </Alert>
          )}
        </Box>

        <Button type="submit" color="inherit" variant="outlined" sx={{ display: 'block', width: 100, mt: 3, mb: 2, mx: 'auto' }}>
          Log In
        </Button>
        <Grid container></Grid>
      </Box>
    </div>
  );
}

export default LoginTab;
