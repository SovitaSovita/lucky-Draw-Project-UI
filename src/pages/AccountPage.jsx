import React from 'react'
import Navbar from '../component/Navbar'
import ChangePassword from '../component/ChangePassword'

export default function AccountPage() {
    return (
        <>
            <div className='p-6 pl-3 sm:ml-64'>
                <div className="py-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg">
                    <Navbar />
                    <ChangePassword/>
                </div>
            </div>
        </>
    )
}
