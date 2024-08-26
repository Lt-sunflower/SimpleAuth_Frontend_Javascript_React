import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/UseAuth';

const SecuredRoute = () => {
  const { token } = useAuth();
  let auth = { token: token };
  let storedAuthState = localStorage.getItem('authState');

  return storedAuthState === 'true' || (auth.token && auth.token !== '') ? <Outlet /> : <Navigate to="/login" />;
};

export default SecuredRoute;
