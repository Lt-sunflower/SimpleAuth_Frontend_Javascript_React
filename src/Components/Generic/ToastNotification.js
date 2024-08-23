import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastNotification = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={1200} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
