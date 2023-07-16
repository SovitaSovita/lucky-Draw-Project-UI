import React from 'react'
import { Button } from 'react-daisyui'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {

    const location = useLocation()
    let currentPath = location.pathname

    return (
        <div>
            {/* navbar head */}
            <div className='flex justify-between px-4 mb-12'>
                <div>
                    <span className='text-gray-500'>Pages</span> {currentPath}
                </div>
                <div className='flex items-center'>
                    {/* btn goto frontEnd */}
                    <Link to={'/'}>
                        <Button className='btn btn-outline btn-primary btn-sm px-4'>Let's Draw</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
