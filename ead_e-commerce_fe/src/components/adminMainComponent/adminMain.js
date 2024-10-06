import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import useAllUsers from '../../hooks/useViewAllUsers';
import './adminMain.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function AdminMain() {

  const { users } = useAllUsers();

  const customersCount = users.filter(user => user.userType === 'Customer').length;
  const vendorsCount = users.filter(user => user.userType === 'Vendor').length;
  const csrsCount = users.filter(user => user.userType === 'CSR').length;

  const barData = {
    labels: ['Customers', 'Vendors', 'CSRs'],
    datasets: [
      {
        label: 'Number of People',
        data: [customersCount, vendorsCount, csrsCount],
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        borderColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutData = {
    labels: ['Customers', 'Vendors', 'CSRs'],
    datasets: [
      {
        data: [customersCount, vendorsCount, csrsCount],
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        hoverBackgroundColor: ['#357ab7', '#7a4e8d', '#2f9f86'],
      },
    ],
  };

  return (
    <>
      <div className='adminMain'>
        <h1 className='header2 text-center my-4'>Admin Dashboard</h1>
        <div className="row mt-4 text-center">
          <div className="col-md-4">
            <div className="box p-4 boxvendor">
              <i className="bi bi-check2-circle fs-1 mb-3 boxi"></i>
              <h3 className="boxh3">Product Approval</h3>
              <p className="boxp">Approve or reject the products submitted to cart.io</p>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary btn-lg boxbutton"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/productApprovals`;
                  }}
                >
                  Click Here
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box p-4 boxvendor">
              <i className="bi bi-table fs-1 mb-3 boxi"></i>
              <h3 className="boxh3">Inventory</h3>
              <p className="boxp">Manage your product inventory efficiently.</p>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary btn-lg boxbutton"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/inventory`;
                  }}
                >
                  Click Here
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box p-4 boxvendor">
              <i className="bi bi-cart4 fs-1 mb-3 boxi"></i>
              <h3 className="boxh3">Orders</h3>
              <p className="boxp">Track and fulfill customer orders easily.</p>
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg boxbutton">
                  Click Here
                </button>
              </div>
            </div>
          </div>
        </div>
          <div className="px-3">
            <div className="container-fluid">
              <div className="row g-3 my-2">
                <div className="col-md-3 p-1">
                  <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ height: '200px', backgroundColor: 'gray' }}>
                    <div>
                      <h3 className="fs-2 text-white">{customersCount}+</h3>
                      <p className="fs-2 fw-bold">Customers</p>
                    </div>
                    <i className="bi bi-person-fill p-3" style={{ fontSize: '5rem' }}></i>
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ height: '200px', backgroundColor: 'gray' }}>
                    <div>
                      <h3 className="fs-2 text-white">{vendorsCount}+</h3>
                      <p className="fs-2 fw-bold">Vendors</p>
                    </div>
                    <i className="bi bi-table p-3" style={{ fontSize: '5rem' }}></i>
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ height: '200px', backgroundColor: 'gray' }}>
                    <div>
                      <h3 className="fs-2 text-white">{csrsCount}+</h3>
                      <p className="fs-3 fw-bold">Customer Supports</p>
                    </div>
                    <i className="bi bi-person-workspace p-3" style={{ fontSize: '5rem' }}></i>
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ height: '200px', backgroundColor: 'gray' }}>
                    <div>
                      <h3 className="fs-2 text-white">{users.length}+</h3>
                      <p className="fs-2 fw-bold">All Users</p>
                    </div>
                    <i className="bi bi-people-fill p-3" style={{ fontSize: '5rem' }}></i>
                  </div>
                </div>
              </div>

              {/* Bar and Circle Graphs */}
              <div className="row g-3 my-1">
                <div className="col-md-6">
                  <div className="p-3 shadow-sm rounded" style={{ backgroundColor: 'white', height: '400px', width: '100%' }}>
                    <h4 className="text-center text-black">Bar Graph</h4>
                    {/* Adjust width by setting it explicitly on Bar component */}
                    <Bar data={barData} options={barOptions} height={300} width={500} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 shadow-sm rounded" style={{ backgroundColor: 'white', height: '400px', width: '100%' }}>
                    <h4 className="text-center text-black">Doughnut Chart</h4>
                    {/* Adjust width and height for Doughnut chart */}
                    <Doughnut data={doughnutData} options={doughnutOptions} height={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
