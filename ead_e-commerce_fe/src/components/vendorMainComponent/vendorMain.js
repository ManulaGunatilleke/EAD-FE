import React from 'react';
import './vendorMain.css';

export default function VendorMain() {
  return (
    <>
      <div className='vendorMain container'>
        <h1 className='header1 text-center my-4'>Vendor Dashboard</h1>

        {/* Boxes Section */}
        <div className="row mt-4 text-center">
          <div className="col-md-4">
            <div className="box p-4">
              <i className="bi bi-table fs-1 mb-3"></i>
              <h3>Products</h3>
              <p>Manage your product inventory efficiently.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Click Here</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box p-4">
              <i className="bi bi-cart4 fs-1 mb-3"></i>
              <h3>Orders</h3>
              <p>Track and fulfill customer orders easily.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Click Here</button>
              </div>              
            </div>
          </div>
          <div className="col-md-4">
            <div className="box p-4">
              <i className="bi bi-graph-up-arrow fs-1 mb-3"></i>
              <h3>Analytics</h3>
              <p>Analyze sales and performance metrics.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Click Here</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moved VendorHomePageThirdPart Section */}
      <div className="VendorHomePageThirdPart mt-5 py-5">
        <div className="row align-items-center justify-content-start">
          <div className="col-md-6 text-center">
            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' className='Docimg5' alt='rffre' />
          </div>
          <div className="col-md-6">
            <h2 className="VendorHomeHeading2"> Find MTB Sellers at;</h2>
            <p className="PH3Para">🚩123/A, <br /> Sir Manula Gunatilleke Av, <br /> Manugama.</p>
            <p className="PH3Para">☎ Telephone:</p>
            <p className="PH3Para2">+9411-2375843 / +9411-57584543</p>
            <p className="PH3Para">@ Email:</p>
            <p className="PH3Para2">contact@mtbsellers.lk</p>
          </div>
        </div>
      </div>
    </>
  );
}
