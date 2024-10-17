import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AllContext';
import { toast } from 'react-toastify';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {

    const { logout } = useAuth();

    const [userDropdown, setUserDropdown] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        toast.success("Logged Out Successfully")
        setUserDropdown(false)
        logout();
        navigate('/')
    }

    return (
        <div className='shadow h-[72px] w-full flex justify-between items-center'>
            <div className="container">
                <div className='px-5 sm:px-0 flex justify-between items-center'>
                    <p className='font-bold text-lg'>Super Admin Dashboard</p>
                    <div className='relative flex justify-center items-center gap-5'>
                        <NavLink to={'/'} className={`hover:text-blue-600 font-medium`}>Dashboard</NavLink>
                        <NavLink to={'/admin'} className={`hover:text-blue-600 font-medium`}>Admin</NavLink>
                        <div onClick={() => setUserDropdown(!userDropdown)} className='cursor-pointer'>
                            <FaUserCircle fontSize={36} />
                        </div>
                        {
                            userDropdown &&
                            <div className='absolute bg-white shadow-xl border-[1px] border-gray-200 flex flex-col justify-start items-center right-0 top-10 p-3 px-5 z-[1000]'>
                                <button className='text-red-800 hover:bg-red-100 hover:text-red-700 px-6 py-3 rounded-lg' onClick={handleLogout}>LogOut</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header