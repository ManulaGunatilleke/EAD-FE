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
  // const [toggle, setToggle] = useState(true)

  // const Toggle = () => {
  //   setToggle(!toggle)
  // }

  // user and token details pass
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(()=> {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <Routes>
          <Route path='' element={<Index/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </UserContext.Provider>
    </Router>
    // <div className='container-fluid bg-secondary min-vh-100 '>
    //   <div className='row '>
    //     {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
    //       <Sidebar />
    //     </div>}
    //     {toggle && <div className='col-4 col-md-2'></div>}
    //     <div className='col'>
    //       <Home Toggle={Toggle} />
    //     </div>
    //   </div>
    // </div>
  )
}
export default App