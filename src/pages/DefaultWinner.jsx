import React, { useEffect, useState } from 'react'
import { setEnabled } from '../redux/slice/SwitchSlice';
import { Switch } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Navbar from '../component/Navbar';

import AlertMesages from '../component/AlertMesages';
import FakeWinnerPopUp from '../component/FakeWinnerPopUp';
import ResetFakeWinnerPopUp from '../component/ResetFakeWinnerPopUp';

export default function DefaultWinner() {

    const [isLoading, setIsLoading] = useState(false)

    const fake = useSelector((state) => state.allList.fakeWinner);
    //console.log(fake)

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    let [isOpenReset, setIsOpenReset] = useState(false)

    function closeModalReset() {
        setIsOpenReset(false)
    }

    function openModalReset() {
        setIsOpenReset(true)
    }

    return (

        <div>
            <AlertMesages />
            <div className='p-6 pl-3 sm:ml-64'>
                <div className="py-4 px-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg">
                    <Navbar />

                    <div className="flex justify-between items-center bg-white py-2 px-4 rounded-lg w-1/2">
                        <span>Default Winner (7th)</span>
                        {
                            !fake ? (
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                    Open
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={openModalReset}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
                                    Close and Reset
                                </button>
                            )
                        }
                    </div>

                    <div className='bg-white p-8 pt-4 rounded-lg shadow-sm mt-10 font-medium w-1/2'>
                        <p>Default Winner Information</p>
                        <div className='flex justify-between bg-gray-100 py-1 px-4 rounded-md mt-5'>
                            <span>Order Date</span>
                            <p className='font-normal'>{formatDate(fake?.dateOfOrder)}</p>
                        </div>
                        <div className='flex justify-between bg-gray-100 py-1 px-4 rounded-md mt-4'>
                            <span>Order No</span>
                            <p className='font-normal'>{fake?.orderNo}</p>
                        </div>
                        <div className='flex justify-between bg-gray-100 py-1 px-4 rounded-md mt-4'>
                            <span>Name</span>
                            <p className='font-normal'>{fake?.name}</p>
                        </div>
                        <div className='flex justify-between bg-gray-100 py-1 px-4 rounded-md mt-4'>
                            <span>Phone number</span>
                            <p className='font-normal'>{fake?.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
            <FakeWinnerPopUp isOpen={isOpen} closeModal={closeModal} />
            <ResetFakeWinnerPopUp isOpenReset={isOpenReset} closeModalReset={closeModalReset}/>
        </div>
    )
}
