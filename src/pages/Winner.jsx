import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import WinnerCard from '../component/WinnerCard'
import { get_winner } from '../redux/service/WinnerService'

export default function Winner() {
    const [winnerList, setWinnerList] = useState([])
    useEffect(() => {
        get_winner().then((res) => {
            setWinnerList(res.data.payload)
        })
    }, [])
    return (
        <>
            <div className='p-6 pl-3 sm:ml-64'>
                <div className="p-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg dark:border-gray-700">
                    <Navbar />
                    {/* winner */}
                    <div className='pl-8 pr-4'>
                        <ol className="relative border-l border-gray-200 dark:border-gray-700">
                            {
                                winnerList.map((item, index) => (
                                    <WinnerCard items={item} key={index} order={index + 1}/>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}
