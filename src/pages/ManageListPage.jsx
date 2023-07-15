import React from 'react'
import Booking from '../component/Booking'
import SideBar from '../component/SideBar'

export default function ManageListPage() {
    return (
        <>
            <SideBar />
            <div className='p-6 pl-3 sm:ml-64'>
                <div className="p-4 border-2 border-gray-200 h-screen border-dashed rounded-lg dark:border-gray-700">
                    <Booking />
                </div>
            </div>
        </>
    )
}
