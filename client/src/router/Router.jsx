import { createBrowserRouter } from "react-router";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../Pages/home/Home";
import AvailableCars from "../Pages/available-cars/AvailableCars";
import Login from "../Pages/auth-pages/Login";
import Register from "../Pages/auth-pages/Register";
import NotFound from "../Pages/notFound/NotFound";
import ErrorPage from "../Pages/notFound/ErrorPage";
import PrivateRoute from "../private/PrivateRoute";
import CarDetails from "../Pages/car-details/CarDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import DashBoard from "../Pages/dashboard/DashBoard";
import MyCars from "../Pages/dashboard/my-cars/MyCars";
import ManageBooking from "../Pages/dashboard/my-bookings/ManageBooking";
import AddCar from "../Pages/dashboard/add-car/AddCar";
import UserPayments from "../Pages/dashboard/userPayments/UserPayments";
import BookingHistory from "../Pages/dashboard/booking-history/BookingHistory";
import SalesReport from "../Pages/dashboard/sales-report/SalesReport";
import ManagePayments from "../Pages/dashboard/manage-payments/ManagePayments";
import ManageUsers from "../Pages/dashboard/manage-users/ManageUsers";
import MyBookings from "../Pages/dashboard/my-bookings/MyBookings";
import UpdateProfile from "../Pages/dashboard/profile/UplateProfile";
import AboutUs from "../Pages/about-us/AboutUs";
import ContactUs from "../Pages/contact-us/ContactUs";
import TermsAndConditions from "../Pages/termsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../Pages/privacy-policy/PrivacyPolicy";
import SafetySecurityGuidelines from "../Pages/safety-security-guidelines/SafetySecurityGuidelines";
import AdminRoute from "../private/AdminRoute";
import OwnerRoute from "../private/OwnerRoute";
import UserRoute from "../private/UserRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: DefaultLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: 'about-us',
                Component: AboutUs
            },
            {
                path: 'contact-us',
                Component: ContactUs
            },
            {
                path: 'available-cars',
                Component: AvailableCars
            },
            {
                path: 'car/:id',
                Component: CarDetails
            },
            {
                path:'login',
                Component: Login
            },
            {
                path:'register',
                Component: Register
            },
            {
                path:"terms-and-condtions",
                Component: TermsAndConditions
            },
            {
                path: "privacy-policy",
                Component: PrivacyPolicy
            },
            {
                path: "safety-security",
                Component: SafetySecurityGuidelines
            }
        ]
    },
    {
        path:'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                index: true,
                Component: DashBoard
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-payments',
                element: <AdminRoute><ManagePayments></ManagePayments></AdminRoute>
            },
            {
                path: 'sales-report',
                element: <AdminRoute><SalesReport></SalesReport></AdminRoute>
            },
            {
                path: 'add-car',
                element: <OwnerRoute><AddCar></AddCar></OwnerRoute>
            },
            {
                path: 'my-cars',
                element: <OwnerRoute><MyCars></MyCars></OwnerRoute>
            },
            {
                path: 'booking-history',
                element: <OwnerRoute><BookingHistory></BookingHistory></OwnerRoute>
            },
            {
                path: 'manage-booking/:id',
                element: <OwnerRoute><ManageBooking></ManageBooking></OwnerRoute>
            },
            {
                path: 'my-bookings',
                element: <UserRoute><MyBookings></MyBookings></UserRoute>
            },
            {
                path: 'user-payments',
                element: <UserRoute><UserPayments></UserPayments></UserRoute>
            },
            {
                path: 'update-profile',
                element: <UpdateProfile></UpdateProfile>
            },
        ]

    },
    {
        path:'*',
        Component: ErrorPage
    },
    {
        path:'404',
        Component: NotFound
    }
  
])
