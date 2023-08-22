import React from 'react'

export default function WinnerCard({items, order}) {

    return (
        <li className="mb-10 ml-10 mt-12">
            {/* count winner */}
            <span className="absolute flex items-center justify-center font-bold w-10 h-10 bg-blue-300 text-blue-800 rounded-full -left-5 ring-4 ring-white">
                {order}
            </span>
            {/* winner each card */}
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center space-x-4">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>

                    <div className="font-medium dark:text-white">
                        <div>{items?.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Telephone : {items?.phoneNumber}</div>
                    </div>
                </div>
            </div>
        </li>
    )
}
