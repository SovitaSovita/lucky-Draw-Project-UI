import React from 'react'
import Navbar from '../component/Navbar'
import WinnerCard from '../component/WinnerCard'

export default function Winner() {
    return (
        <>
            <div className='p-6 pl-3 sm:ml-64'>
                <div className="p-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg dark:border-gray-700">
                    <Navbar />
                    {/* winner */}
                    <div className='pl-8 pr-4'>
                        <ol className="relative border-l border-gray-200 dark:border-gray-700">
                            <WinnerCard num={1}/>
                            <WinnerCard num={2}/>
                            <WinnerCard num={3}/>
                            <WinnerCard num={4}/>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}
