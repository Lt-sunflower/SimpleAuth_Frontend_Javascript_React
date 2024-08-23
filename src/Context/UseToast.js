import { createContext, useContext, useState } from "react";
import ToastNotification from "../Components/Generic/ToastNotification";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', severity: '', open: false });

  const showToast = (message, severity) => {
    setToast({ message, severity, open: true });
  };

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const ToastContextValue = {
    showToast,
  };

  return (
    <ToastContext.Provider value={ToastContextValue}>
      {children}
      <ToastNotification
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleClose}
      />
    </ToastContext.Provider>  );
};

export const useToast = () => useContext(ToastContext);
