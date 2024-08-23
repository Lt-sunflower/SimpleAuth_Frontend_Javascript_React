import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Login from './Pages/Login';
import { UserProvider } from './Context/UseAuth';
import { ToastProvider } from './Context/UseToast';
import SecuredRoute from './Components/Generic/SecuredRoute';
import { LoadingProvider } from './Context/UseLoading';

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <LoadingProvider>
        <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login/>}/>
            <Route element={<SecuredRoute/>}>
              <Route path='/home' element={<Home/>}/>
            </Route>        
        </Routes>
        </LoadingProvider>
      </ToastProvider>
    </UserProvider>
  );
}

export default App;
