import { Link, NavLink } from 'react-router'
import logo from '../assets/images/logo.png'
import logoWhite from '../assets/images/logo-white.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from 'react'
import useAuth from '../hooks/useAuth';
import userPhoto from '../assets/images/user.png'


export default function Header() {
    const [menu, setMenu] = useState(false);
    const { user, userLogout } = useAuth();
    const [showLogout, setShowLogout] = useState(false);


    const handleLogout = () => {
        userLogout().then(() => { }).catch(() => { });
    }

    const handleMenu = () => {
        setMenu(!menu);
    }
    return (
        <>
            <header className={`px-4 py-5 sticky top-0 z-50 bg-[#1D232A] dark:bg-white shadow-lg`}
            >
                <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto">
                    <div className="flex justify-between items-center">
                        <Link to={'/'}>
                            <img className='h-16 hidden dark:block' src={logo} alt="Logo" />
                            <img className='h-16 dark:hidden' src={logoWhite} alt="Logo" />
                        </Link>
                        <nav className={`absolute -left-full top-0 w-80 h-screen bg-[#1D232A] dark:bg-white z-10 p-10 lg:p-0 pt-14 lg:pt-0 lg:relative lg:w-auto lg:h-auto lg:bg-transparent lg:left-0 duration-300 ease-in-out  ${menu ? "left-0" : "-left-full"}`}>
                            <div className='text-right lg:hidden'><button className='text-3xl -mr-4 -mt-4 p-4' onClick={() => { setMenu(!menu) }}><HiMiniXMark /></button></div>
                            <ul className='flex flex-col lg:flex-row gap-10 lg:gap-2  main-menu'>
                                <li><NavLink className='py-2 px-5 rounded-md' to='/'>Home</NavLink></li>
                                <li><NavLink className='py-2 px-5 rounded-md' to='/available-cars'>Available Cars</NavLink></li>
                                <li><NavLink className='py-2 px-5 rounded-md' to='/about-us'>About Us</NavLink></li>
                                <li><NavLink className='py-2 px-5 rounded-md' to='/contact-us'>Contact Us</NavLink></li>
                                {
                                    user && (
                                        <>
                                            <li><NavLink className='py-2 px-5 rounded-md' to='/dashboard'>Dashboard</NavLink></li>
                                        </>
                                    )
                                }
                            </ul>
                        </nav>
                        <div className="flex items-center gap-4">

                            <div>
                                {
                                    user ? (
                                        <div onClick={() => setShowLogout(!showLogout)} className='relative'>
                                            <img className='w-10 h-10 rounded-full object-cover' src={user?.photoURL ? user?.photoURL : userPhoto} alt={user?.displayName} />
                                            <div className={`opacity-0 absolute top-full right-0 w-30 bg-[#292f3b] p-3 rounded-md text-center dark:bg-[#f1f1f1] ${showLogout ? "opacity-100" : "opacity-0"}`}>
                                                <p>{user?.displayName}</p>
                                                <button onClick={handleLogout} className={`btn btn-neutral h-7 sm:h-7 px-3 sm:px-4 dark:btn-primary mt-3`}>Logout</button>
                                            </div>

                                        </div>
                                    ) : (
                                        <Link to={'/login'} className='btn btn-neutral h-7 sm:h-10 px-3 sm:px-4 dark:btn-primary'>Login</Link>
                                    )
                                }
                            </div>
                            <div className="lg:hidden">
                                <button onClick={handleMenu} type='button' className='p-3 text-3xl'>
                                    {
                                        menu ? (
                                            <HiMiniXMark />
                                        ) : (
                                            <RxHamburgerMenu />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}
