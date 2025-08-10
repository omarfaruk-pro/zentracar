import { NavLink } from 'react-router';
import {
    FaTachometerAlt,
    FaUsersCog,
    FaChartLine,
    FaCar,
    FaPlusCircle,
    FaHistory,
    FaCreditCard,
    FaClipboardList,
    FaUserEdit
} from 'react-icons/fa';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import useUserInfo from '../../hooks/useUserInfo';

export default function DashboardSidebar() {

    const { userInfo } = useUserInfo();
    console.log(userInfo);
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition text-sm font-medium text-white dark:text-black 
     ${isActive ? 'bg-blue-600 text-white dark:text-white' : 'text-gray-700 hover:bg-blue-600 hover:text-white'}`;

    return (
        <aside className="w-full sticky top-36 overflow-y-auto max-h-[calc(100vh-160px)]">

            <nav className="space-y-1">

                {/* Dashboard Home */}
                <NavLink to="/dashboard" end className={linkClass}>
                    <FaTachometerAlt /> Dashboard
                </NavLink>

                {/* Admin Routes */}
                {
                    userInfo?.role === 'admin' && (
                        <>
                            <NavLink to="/dashboard/manage-users" className={linkClass}>
                                <FaUsersCog /> Manage Users
                            </NavLink>
                            <NavLink to="/dashboard/manage-payments" className={linkClass}>
                                <FaMoneyCheckDollar /> Manage Payments
                            </NavLink>
                            <NavLink to="/dashboard/sales-report" className={linkClass}>
                                <FaChartLine /> Sales Report
                            </NavLink>
                        </>
                    )
                }


                {/* Car Owner Routes */}
                {
                    userInfo?.role === "owner" && (
                        <>
                            <NavLink to="/dashboard/my-cars" className={linkClass}>
                                <FaCar /> My Cars
                            </NavLink>
                            <NavLink to="/dashboard/add-car" className={linkClass}>
                                <FaPlusCircle /> Add Car
                            </NavLink>
                            <NavLink to="/dashboard/booking-history" className={linkClass}>
                                <FaHistory /> Booking History
                            </NavLink>
                        </>
                    )
                }


                {/* User Routes */}
                {
                    userInfo?.role === "" && (
                        <>
                            <NavLink to="/dashboard/user-payments" className={linkClass}>
                                <FaCreditCard /> My Payments
                            </NavLink>
                            <NavLink to="/dashboard/my-bookings" className={linkClass}>
                                <FaClipboardList /> My Bookings
                            </NavLink>
                        </>
                    )
                }

                {/* Common Route */}
                <NavLink to="/dashboard/update-profile" className={linkClass}>
                    <FaUserEdit /> Update Profile
                </NavLink>

            </nav>
        </aside>
    );
}
