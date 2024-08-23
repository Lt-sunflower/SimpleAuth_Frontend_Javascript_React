import { useAuth } from '../Context/UseAuth';

const useApiService = () => {
  const { token, setToken } = useAuth();
  const BASE_URL = process.env.REACT_APP_API_URL;

  const getWithAuth = async (path) => {
    const url = BASE_URL + path;
    const options = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    };

    try {
      let response = await fetch(url, options);

      if (response.status === 403) {
        const newToken = await getNewToken();
        if (newToken) {
          setToken(newToken);
          options.headers['Authorization'] = 'Bearer ' + newToken;
          response = await fetch(url, options);
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const postWithAuth = async (path, params) => {
    const url = BASE_URL + path;
    const options = {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + token,
      },
    };

    try {
      let response = await fetch(url, options);

      if (response.status === 403) {
        const newToken = await getNewToken();
        if (newToken) {
          setToken(newToken);
          options.headers['Authorization'] = 'Bearer ' + newToken;
          response = await fetch(url, options);
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const getNewToken = async () => {
    const url = BASE_URL + '/refresh';
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 403) {
        // Handle refresh token expiration
        return null;
      } else {
        return await response.text();
      }
    } catch (error) {
      throw error;
    }
  };

  return { getWithAuth, postWithAuth };
};

export default useApiService;
