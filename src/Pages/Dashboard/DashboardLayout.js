import React from 'react';
import Navbar from './../Shared/Navbar/Navbar';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
            
            <Navbar></Navbar>
 
            <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
     <Outlet></Outlet>  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
 
      <li><Link to='/dashboard'>My Appointment</Link></li>
      <li><Link to='dashboard/users'>All Users </Link></li>
    </ul>
  </div>
</div>
  

        </div>
    );
};

export default DashboardLayout;