import React from 'react';
import './csrMain.css';

export default function CSRMain() {
  return (
    <>
      <div className='csrMain container'>
        <h1 className='headercsr text-center my-4'>Customer Support Representative Dashboard</h1>

        {/* Boxes Section */}
        <div className="row mt-4 text-center">
          <div className="col-md-4">
            <div className="box p-4 boxcsr">
              <i className="bi bi-person-add fs-1 mb-3 boxi"></i>
              <h3 className='boxh3'>Cutomer Request</h3>
              <p className='boxp'>Manage your customer request efficiently.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg boxcsrbutton">Click Here</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box p-4 boxcsr">
              <i className="bi bi-cart-x fs-1 mb-3 boxi"></i>
              <h3 className='boxh3'>Cancel Orders</h3>
              <p className='boxp'>Track and cancel customer orders properly.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg boxcsrbutton">Click Here</button>
              </div>              
            </div>
          </div>
          <div className="col-md-4">
            <div className="box p-4 boxcsr">
              <i className="bi bi-graph-up-arrow fs-1 mb-3 boxi"></i>
              <h3 className='boxh3'>Analytics</h3>
              <p className='boxp'>Analyze sales and performance metrics.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg boxcsrbutton">Click Here</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moved csrHomePageThirdPart Section */}
      <div className="csrHomePageThirdPart mt-5 py-5">
        <div className="row align-items-center justify-content-start">
          <div className="col-md-6 text-center">
            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' className='Docimg5' alt='rffre' />
          </div>
          <div className="col-md-6">
            <h2 className="csrHomeHeading2"> Find MTB Sellers at;</h2>
            <p className="PH3Para">🚩123/A, <br /> Sir Manula Gunatilleke Av, <br /> Manugama.</p>
            <p className="PH3Para">☎ Telephone:</p>
            <p className="PH3Para2">+9411-2375843 / +9411-57584543</p>
            <p className="PH3Para">@ Email:</p>
            <p className="PH3Para2">contact@mtbsellers.lk</p>
          </div>
        </div>
      </div>
    </>
  )
}
