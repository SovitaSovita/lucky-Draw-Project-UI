import React from 'react'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

export default function DashboardCard() {
    return (
        <div className='grid grid-cols-3 gap-6'>
            <div className="rounded-xl bg-gradient-to-r from-brand-red to-[#FF694F] shadow-md border">
                <div className="flex justify-between items-center">
                    <div className='py-4 px-6 text-base-100'>
                        <h2 className="card-title uppercase">Event</h2>
                        <span>Event name</span>
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
                        <FolderCopyOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                    </div>
                </div>
            </div>
        </div>
    )
}
