import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/UseAuth';

const SecuredRoute = () => {
  const { token } = useAuth();
  let auth = { token: token };
  return auth.token === null || auth.token === '' ? <Navigate to="/login" /> : <Outlet />;
};

export default SecuredRoute;
