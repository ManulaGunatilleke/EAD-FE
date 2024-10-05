import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from './ContextComponent/ContextComponent';

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

// Header and Footer
import Header from './components/headerComponent/Header';
import Footer from './components/footerComponent/Footer';

// Basic Components
import Index from './pages/IndexPage/IndexPage';
import Home from './pages/homePage/homePage';
import LoginComponent from './auth/components/loginComponent/loginComponent';
import Profile from './pages/ProfilePage/profilePage';

// Admin Pages
import RegisterComponent from './auth/components/registerComponent/registerComponent';
import NotActivatePage from './pages/notActivatePage/notActivatePage';
import AllUsers from './components/allUsersComponent/allUsersComponent';

// Vendor Pages
import RatingPage from './pages/ratingPage/ratingPage';

//Product Mgmt Pages
import CreateProduct from './pages/createProductPage/createProductPage';
import ViewVendorProductPage from './pages/viewVendorProductPage/viewVendorProductPage';
import ViewSingleProductPage from './pages/viewSingleProductPage/viewSingleProductPage';
import UpdateProductPage from './pages/updateProductPage/updateProductPage';
import ViewInventoryLevelsPage from './pages/viewInventoryLevelsPage/viewInventoryLevelsPage';
import ViewSingleInventoryProductPage from './pages/viewSingleInventoryProductPage/viewSingleInventoryProductPage';
import UpdateSingleInventoryPage from './pages/updateSingleInventoryPage/updateSingleInventoryPage';
import ProductApprovalPage from './pages/productApprovalPage/productApprovalPage';
import ViewApprovalProductPage from './pages/viewApprovalProductPage/viewApprovalProductPage';

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
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/rating/:id' element={<RatingPage/>}/>
            {/* Product Mgmt Routes */}
            <Route path='/createProduct' element={<CreateProduct/>}/>
            <Route path='/viewVendorProducts' element={<ViewVendorProductPage/>}/>
            <Route path='/viewProduct/:id' element={<ViewSingleProductPage/>}/>
            <Route path='/updateProduct/:id' element={<UpdateProductPage/>}/>
            <Route path='/inventory' element={<ViewInventoryLevelsPage/>}/>
            <Route path='/viewInventoryProduct/:id' element={<ViewSingleInventoryProductPage/>}/>
            <Route path='/updateInventory/:id' element={<UpdateSingleInventoryPage/>}/>
            <Route path='/productApprovals' element={<ProductApprovalPage/>}/>
            <Route path='/viewProductApproval/:id' element={<ViewApprovalProductPage/>}/>
          </Routes>
        <Footer/>
      </UserContext.Provider>
    </Router>
  )
}
export default App