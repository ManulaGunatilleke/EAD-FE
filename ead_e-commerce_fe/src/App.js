import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from './ContextComponent/ContextComponent';

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

// Header
import Header from './components/headerComponent/Header';

// Basic Components
import Index from './pages/IndexPage/IndexPage';
import Home from './pages/homePage/homePage';
import LoginComponent from './auth/components/loginComponent/loginComponent';
import Profile from './pages/ProfilePage/profilePage';

// Admin Pages
import RegisterComponent from './auth/components/registerComponent/registerComponent';
import NotActivatePage from './pages/notActivatePage/notActivatePage';
import AllUsers from './components/allUsersComponent/allUsersComponent';

function App() {

  // user and token details pass
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(()=> {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [userType, setUserType] = useState(()=> {
    const storedUserType = localStorage.getItem("userType");
    return storedUserType ? JSON.parse(storedUserType) : null;
  });
  const [userId, setUserId] = useState(()=> {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? JSON.parse(storedUserId) : null;
  });
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userType", JSON.stringify(userType));
      localStorage.setItem("userId", JSON.stringify(userId));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
    }
  }, [user, token, userType, userId]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, token, setToken, userType, setUserType, userId, setUserId }}>
        <Header/>
        <Routes>
          <Route path='' element={<Index/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          <Route path='/registerAccount' element={<RegisterComponent/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/notActivateAccounts' element={<NotActivatePage/>}/>
          <Route path='/allUsers' element={<AllUsers/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </UserContext.Provider>
    </Router>
  )
}
export default App