import AdminRoute from "../AdminRoute/AdminRoute";
import Appointment from "../Appointment/Appointment/Appointment";
import AddDoctor from "../Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import ManageDoctors from "../Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../Dashboard/MyAppointment/MyAppointment";
import Payment from "../Dashboard/Payment/Payment";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DisplayError from "../shared/DisplayError/DisplayError";
import Signup from "../Signup/Signup";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layout/Main");
const { default: Home } = require("../pages/Home/Home");


export const router = createBrowserRouter([
    {
        path:'/', element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children:[
            {
                path: '/', element: <Home></Home>
            },
            {
                path:'/login', element: <Login></Login>
            },
            {
                path:'/signup', element: <Signup></Signup>
            },
            {
                path: '/appointment', element: <PrivateRoute><Appointment></Appointment></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard', element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children:[
            {
                path: '/dashboard', element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/users', element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/add-doctor', element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/manage-doctor', element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id', element: <AdminRoute><Payment></Payment></AdminRoute>,
                loader: ({params}) => fetch(`https://doctor-site-server.vercel.app/booking/${params.id}`)
            }
        ]
    }
])