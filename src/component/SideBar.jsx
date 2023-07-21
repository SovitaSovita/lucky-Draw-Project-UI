import React from 'react'
import logo from '../assets/img/Artboard_3_2_213b1bea-2b74-4aab-86a5-1bfb64acc4a5_100x@2x.avif'


import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {

    const location = useLocation()
    const currentPath = location.pathname;

    return (
        <div className='font-poppin'>

            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

                <div className='h-screen w-full p-6'>
                    <div className='bg-white shadow border w-full h-full rounded-xl px-4'>

                        {/* head sidebar */}
                        <div className='border-b border-gray-500 py-8 px-6'>
                            {/* <p className='text-white text-xl text-center'>Lucky Draw</p> */}
                            <img src={logo} alt='logo' className=''/>
                        </div>


                        {/* main sidebar */}
                        <nav className='mt-6'>
                            <ul className='text-sm list-none'>
                                <Link to={'/'}>
                                    <li className={currentPath == '/'
                                        ? 'flex items-center bg-brand-red text-white rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <DashboardOutlinedIcon className='mr-2' />
                                        <span>Dashboard</span>
                                    </li>
                                </Link>
                                <Link to={'/manage'}>
                                    <li className={currentPath == '/manage'
                                        ? 'flex items-center bg-brand-red text-white rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <ChecklistOutlinedIcon className='mr-2' />
                                        <span>Manage list</span>
                                    </li>
                                </Link>
                                <Link to={'/winner'} >
                                    <li className={currentPath == '/winner'
                                        ? 'flex items-center bg-brand-red text-white rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <EmojiEventsOutlinedIcon className='mr-2' />
                                        <span>Winner</span>
                                    </li>
                                </Link>
                                <Link to={'/account'} >
                                    <li className={currentPath == '/account'
                                        ? 'flex items-center bg-brand-red text-white rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <PersonOutlineOutlinedIcon className='mr-2' />
                                        <span>Account</span>
                                    </li>
                                </Link>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
        </div>
    )
}
