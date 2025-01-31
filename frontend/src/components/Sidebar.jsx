import React, { useEffect, useState } from 'react'
import { MdMovie, MdSpaceDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import toast from 'react-hot-toast';
import { AiOutlineLogout } from "react-icons/ai";
const Sidebar = () => {
    const { data: user = {} } = useGetCurrentUserQuery()
    const currentUser = user?.user || {};
    const [auth, setAuth] = useState(false);
    const userToken = Cookies.get('userToken');
    useEffect(() => {
        if (userToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [])
    const handleLogout = () => {
        Cookies.remove('userToken');
        window.location.replace('/');
        setTimeout(() => {
            toast.success('successfully logout')
        }, 2000)
    }
    return (
        <div className='w-[20%] md:w-[30%] lg:w-[15%] fixed left-0 lg:left-10 top-10 bottom-10 shadow rounded* bg-[#161D2F]'>
            <div className='w-full mt-5 p-4 h-full'>
                <div className='w-full flex flex-row justify-start items-center gap-2'>
                    <MdMovie size={20} />
                    <h1 className='text-base font-medium tracking-wide hidden md:block  '>Gosaar <span className='text-red-500'>Movies</span></h1>
                </div>

                <div className='w-full mt-10 space-y-4'>
                    <Link className='w-full flex flex-row justify-start items-center gap-3' to='/'>
                        <MdSpaceDashboard size={20} /> <span className='text-base font-medium hidden md:block '>Movies</span>
                    </Link>
                    <Link className='w-full flex flex-row justify-start items-center gap-3' to='/bookmark'>
                        <FaBookmark size={20} /> <span className='hidden md:block text-base font-medium'>Bookmark</span>
                    </Link>
                    {
                        auth && <button className='w-full flex flex-row justify-start items-center gap-3' onClick={() => handleLogout()}>
                            <AiOutlineLogout size={20} /> <span className='hidden md:block text-base font-medium'>Logout</span>
                        </button>
                    }
                </div>

                <div className='w-full absolute bottom-0 right-0'>
                    {
                        auth ? (<div className='w-full flex flex-row justify-start items-center gap-4 p-3 rounded shadow'>
                            <img src="/public/images/avatarProfile.png" className='w-10 h-10 rounded-full shadow' alt="" />
                            <p className='text-base font-medium hidden md:block '>{currentUser?.username}</p>
                        </div>)

                            : (
                                <Link to='/user-login' className='w-full block text-center bg-[#10141fef] p-4 rounded shadow
                                text-white text-base font-medium hover:bg-[#161D2F] transition-all duration-500'>
                                    Login
                                </Link>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar