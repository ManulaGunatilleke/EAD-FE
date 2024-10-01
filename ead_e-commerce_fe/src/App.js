import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from './ContextComponent/ContextComponent';

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

// import Sidebar from '../src/components/Dashboard/Sidebar'
import Index from './pages/IndexPage/IndexPage';
import Home from './pages/homePage/homePage';

// Auth Components
import LoginComponent from './auth/components/loginComponent/loginComponent';

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
        <Routes>
          <Route path='' element={<Index/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </UserContext.Provider>
    </Router>
  )
}
export default App