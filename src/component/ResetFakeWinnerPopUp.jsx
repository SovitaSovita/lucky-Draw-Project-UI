import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import { delete_fake_winner, get_fake_winner } from '../redux/service/TableListService';
import { notifyError, notifySuccess } from '../redux/Constants';
import { Spinner } from 'flowbite-react';
import { setFake } from '../redux/slice/ListSlice';
import { useDispatch } from 'react-redux';

export default function ResetFakeWinnerPopUp({isOpenReset, closeModalReset}) {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const handleResetFakeWinner = () => {
        setIsLoading(true)
        delete_fake_winner().then((res) => {
            if (res?.status == 200) {
                notifySuccess(res.data?.payload)
                setIsLoading(false)
                get_fake_winner().then((ress) => {
                    dispatch(setFake(ress.data?.payload))
                })
                closeModalReset()
            }
            else{
                setIsLoading(false)
                notifyError(res.data?.payload)
                closeModalReset()
            }

        })
    }


    return (
        <div>
            <Transition appear show={isOpenReset} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalReset}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        Are you sure you want to close and reset this action?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-center text-gray-500">
                                            This action will delete your data from table. <br /> Are you sure you want to proceed
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-evenly">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={handleResetFakeWinner}
                                        >
                                            {isLoading ? <Spinner /> : "Yes, I'm sure."}
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModalReset}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
