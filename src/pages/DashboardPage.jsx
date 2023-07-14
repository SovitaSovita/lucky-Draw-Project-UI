import React from 'react'

import importIcon from '../assets/img/import.png'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

import SideBar from '../component/SideBar'
import { Button } from 'react-daisyui'
import Booking from '../component/Booking';

export default function DashboardPage() {
    return (
        <>
            <SideBar />

            <div class="p-6 pl-3 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 h-screen border-dashed rounded-lg dark:border-gray-700">
                    {/* navbar head */}
                    <div className='flex justify-between px-4'>
                        <div>
                            <span className='text-gray-500'>Pages</span> / Dashboard
                        </div>
                        <div className='flex items-center'>

                            {/* search box */}
                            <div className='mr-5'>
                                <input type="text" placeholder="Search here" className="input input-bordered input-sm w-full max-w-xs" />
                            </div>

                            {/* btn goto frontEnd */}
                            <div className=''>
                                <Button className='btn btn-outline btn-primary btn-sm px-4'>Let's Draw</Button>
                            </div>
                        </div>
                    </div>

                    {/* Body dashboard */}
                    <div className='mt-12 grid grid-cols-3 gap-6'>

                        <div className="rounded-xl bg-gradient-to-r from-brand-red to-[#FF694F] shadow-md border">
                            <div className="flex justify-between items-center">
                                <div className='py-4 px-6 text-base-100'>
                                    <h2 className="card-title uppercase">Total</h2>
                                    <span>1230 people</span>
                                </div>
                                <div>
                                    <FileDownloadOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md border">
                            <div className="flex justify-between items-center">
                                <div className='py-4 px-6 text-base-100'>
                                    <h2 className="card-title uppercase">Winner</h2>
                                    <span>05 people</span>
                                </div>
                                <div>
                                    <EmojiEventsOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md border">
                            <div className="flex justify-between items-center">
                                <div className='py-4 px-6 text-base-100'>
                                    <h2 className="card-title uppercase">Totally Customer</h2>
                                    <span>1230 customers</span>
                                </div>
                                <div>
                                    <FileDownloadOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Phone Number
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td class="px-6 py-4">
                                        White
                                    </td>
                                    <td class="px-6 py-4">
                                        Laptop PC
                                    </td>
                                    <td class="px-6 py-4">
                                        $1999
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td class="px-6 py-4">
                                        Black
                                    </td>
                                    <td class="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td class="px-6 py-4">
                                        $99
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                    <Booking />
                </div>
            </div>
        </>
    )
}
