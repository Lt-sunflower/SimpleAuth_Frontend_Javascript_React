import { createContext, useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const showLoading = () => setOpen(true);
  const hideLoading = () => setOpen(false);

  const value = { showLoading, hideLoading };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
