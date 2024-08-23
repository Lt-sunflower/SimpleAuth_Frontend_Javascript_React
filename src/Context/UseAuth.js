import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const url = process.env.REACT_APP_API_URL;

  const login = async (json) => {
    const response = await fetch(url + '/login', {
      method: 'POST',
      credentials: 'include',
      body: json,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response;
  };

  const logout = async () => {
    //query to invalidate on server side (remove httponly token)
    fetch(url + '/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    setToken(null);
    navigate('/login');
  };

  const UserContextValue = { token, setToken, login, logout };

  return <UserContext.Provider value={UserContextValue}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
