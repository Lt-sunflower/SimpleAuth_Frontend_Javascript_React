import { Box, Button } from '@mui/material';
import { useAuth } from '../Context/UseAuth';
import useApiService from '../Services/ApiService';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const Home = () => {
  const { logout } = useAuth();
  const { getWithAuth } = useApiService();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const auth = async () => {
    try {
      const response = await getWithAuth('/user/test');

      if (response.status === 200) {
        setText('ok');
        handleClickOpen();
      } else {
        setText('not ok');
        handleClickOpen();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    logout();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap={2} // spacing between buttons, can be adjusted
    >
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Authentication Check'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{'Authentication: ' + text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" onClick={auth}>
        Test Auth
      </Button>

      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
