import React from 'react'
import '../assets/css/style.css'


import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {

    const location = useLocation()
    const currentPath = location.pathname;

    return (
        <div>

            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

                <div className='h-screen w-full p-6 font-poppin'>
                    <div className='bg-smoke-black w-full h-full rounded-xl px-4'>

                        {/* head sidebar */}
                        <div className='border-b border-gray-500 py-8'>
                            <p className='text-white text-xl text-center'>Klassy watches</p>
                        </div>


                        {/* main sidebar */}
                        <nav className='mt-6'>
                            <ul className='text-white text-sm list-none'>
                                <Link to={'/dashboard'}>
                                    <li className={currentPath == '/dashboard'
                                        ? 'flex items-center bg-brand-red rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <DashboardOutlinedIcon className='mr-2' />
                                        <span>Dashboard</span>
                                    </li>
                                </Link>
                                <Link to={'/dashboard/manage'}>
                                    <li className={currentPath == '/dashboard/manage'
                                        ? 'flex items-center bg-brand-red rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <ChecklistOutlinedIcon className='mr-2' />
                                        <span>Manage list</span>
                                    </li>
                                </Link>
                                <Link to={'/dashboard/winner'} >
                                    <li className={currentPath == '/dashboard/winner'
                                        ? 'flex items-center bg-brand-red rounded-lg px-4 py-3 mb-1 transition-all'
                                        : 'flex items-center rounded-lg px-4 py-3 mb-1 transition-all'}>
                                        <EmojiEventsOutlinedIcon className='mr-2' />
                                        <span>Winner</span>
                                    </li>
                                </Link>
                                <Link to={'/dashboard/account'} >
                                    <li className={currentPath == '/dashboard/account'
                                        ? 'flex items-center bg-brand-red rounded-lg px-4 py-3 mb-1 transition-all'
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
