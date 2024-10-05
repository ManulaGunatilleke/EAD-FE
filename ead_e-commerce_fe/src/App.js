import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import Sidebar from '../src/components/Dashboard/Sidebar'
import Index from './pages/IndexPage/IndexPage';
import Home from './pages/homePage/homePage';

//Product Mgmt
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
  // const [toggle, setToggle] = useState(true)

  // const Toggle = () => {
  //   setToggle(!toggle)
  // }

  return (
    <Router>
      <Routes>
        <Route path='' element={<Index/>}/>
        <Route path='/home' element={<Home/>}/>
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