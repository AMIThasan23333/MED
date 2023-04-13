import React from 'react';
import Navbar from './../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
    return (
        <div>
            

            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default DashBoardLayout;