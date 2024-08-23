import React, { useState } from 'react';
import { Button, TextField, Box, InputLabel, FormControl, Alert, IconButton, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useToast } from '../../Context/UseToast';
import { useLoading } from '../../Context/UseLoading';
import useApiService from '../../Services/ApiService';

import { validateUsername, validatePassword } from '../../Utility/Validation';

const SignupTab = ({ setValue }) => {
  const { showToast } = useToast();
  const { postWithAuth } = useApiService();

  const [signupError, setSignupError] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { showLoading, hideLoading } = useLoading();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [usernameError, setUsernameError] = useState('');
  // const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSignupError(false);
    setUsernameError('');
    // setEmailError('');
    setPasswordError('');

    const data = new FormData(event.currentTarget);

    var username = data.get('username');
    var password = data.get('password');
    var role = 'USER';
    var json = JSON.stringify({ username, password, role });

    // console.log(json)
    // const validationError = validateUsername(username, 8);

    const usernameValidation = data.get('username');
    const passwordValidation = data.get('password');
    const usernameError = validateUsername(usernameValidation);
    const passwordError = validatePassword(passwordValidation);

    if (usernameError || passwordError) {
      if (usernameError) setUsernameError(usernameError);
      if (passwordError) setPasswordError(passwordError);
      setSignupError(true);
      setAlertText('Please fix the errors above and try again.');
    } else {
      showLoading();
      try {
        const response = await postWithAuth('/register', json);
        if (response.status === 201) {
          console.log(json);
          showToast('User Created', 'success');
          setValue(0);
        } else {
          setSignupError(true);
          if (response.status === 400) setAlertText('User already exist');
          else setAlertText('Network issue');
        }
      } catch (error) {
        throw error;
      } finally {
        hideLoading();
      }
    }
  };

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          error={!!usernameError}
          helperText={usernameError}
        />

        {/* <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={!!emailError}
          helperText={emailError}
        /> */}

        <FormControl variant="outlined" margin="normal" required fullWidth error={!!passwordError}>
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
          <FormHelperText>{passwordError}</FormHelperText>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          {signupError && (
            <Alert severity="error" variant="outlined">
              {alertText}
            </Alert>
          )}
        </Box>

        <Button type="submit" color="inherit" variant="outlined" sx={{ display: 'block', width: 100, mt: 3, mb: 2, mx: 'auto' }}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default SignupTab;
