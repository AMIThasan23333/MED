import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/Shared/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Pages/Dashboard/DashboardLayout";
import MyAppointment from "../../Pages/Dashboard/Dashboard/MyAppointment/MyAppointment";
// import AllUSER from "../../Pages/AlluSER/AllUser.JS";
import AllUser from "../../Pages/Dashboard/AllUser/AllUser";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
// import ManangeDoctor from "../../Pages/Dashboard/ManageDoctor/ManangeDoctor";
// import ManangeDoctor from "../../Pages/Dashboard/ManageDoctor/ManangeDoctor";
import ManageDoctor from './../../Pages/Dashboard/AllUser/ManageDoctor';
import Payment from './../../Pages/Dashboard/Payment/Payment';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,

        children : [

             {
                path : '/dashboard',
                element :<MyAppointment></MyAppointment>

             },             
             {
                path : '/dashboard/users',
                element :<AdminRoute><AllUser></AllUser></AdminRoute>

             },

             {
                path : '/dashboard/addDoctor',
                element :<AdminRoute><AddDoctor></AddDoctor></AdminRoute>

             },

             {
                path : '/dashboard/manageDoctor',
                element :<AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>

             },
             {
                path : '/dashboard/payment/:id',
                element :<AdminRoute><Payment></Payment></AdminRoute>

             }

        ]
    }
])

export default router;