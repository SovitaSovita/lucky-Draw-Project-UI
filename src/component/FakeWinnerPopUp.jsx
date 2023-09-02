import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { Field, Form, Formik } from 'formik';
import { WinnerSchema } from '../utils/Validation';
import { notifySuccess } from '../redux/Constants';
import { insert_fake_winner } from '../redux/service/TableListService';
import { useDispatch } from 'react-redux';
import { setFake } from '../redux/slice/ListSlice';
import { Spinner } from 'flowbite-react';

export default function FakeWinnerPopUp({ isOpen, closeModal }) {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);

    function formatDate(inputDate) {
        const dateParts = inputDate.split("-");
        const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
        return formattedDate;
    }

    const onSubmitWinner = (values) => {
        console.log("values", values)
        const formattedDate = formatDate(values?.dateOfOrder);

        let valuesConvert = {
            name: values.name,
            dateOfOrder: values?.dateOfOrder,
            orderNo: values?.orderNo,
            phoneNumber: values?.phoneNumber
        }

        setIsLoading(true)
        insert_fake_winner(values).then((res) => {
            if (res?.status == 200) {
                setIsLoading(false)
                dispatch(setFake(values))
                notifySuccess("The default Winner has been saved")
                closeModal()
            } else {
                setIsLoading(false)
                closeModal()
            }
        })
    }

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={false} static className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Insert Winner Information
                                    </Dialog.Title>
                                    <Formik
                                        initialValues={{
                                            name: "",
                                            dateOfOrder: "",
                                            orderNo: "",
                                            phoneNumber: "",
                                        }}
                                        validationSchema={WinnerSchema}
                                        onSubmit={onSubmitWinner}
                                    >
                                        {({ errors, touched }) => (
                                            <Form
                                                className='bg-white p-1.5 mt-4'
                                            >

                                                <div className="mb-4">
                                                    <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                                                        {/* <LockOutlinedIcon className="text-gray-500" /> */}
                                                        <Field
                                                            type="date"
                                                            name="dateOfOrder"
                                                            id="dateOfOrder"
                                                            className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                                                        />
                                                    </div>
                                                    {errors.dateOfOrder && touched.dateOfOrder ? (
                                                        <div className="text-red-500 text-sm">
                                                            {errors.dateOfOrder}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                                                        <Field
                                                            type="text"
                                                            placeholder="Enter OrderNo"
                                                            name="orderNo"
                                                            id="orderNo"
                                                            className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                                                        />
                                                    </div>
                                                    {errors.orderNo && touched.orderNo ? (
                                                        <div className="text-red-500 text-sm">{errors.orderNo}</div>
                                                    ) : null}
                                                </div>


                                                <div className="mb-4">
                                                    <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                                                        <Field
                                                            type="text"
                                                            placeholder="Enter Winner Name"
                                                            name="name"
                                                            id="name"
                                                            className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                                                        />
                                                    </div>
                                                    {errors.name && touched.name ? (
                                                        <div className="text-red-500 text-sm">
                                                            {errors.name}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                                                        <Field
                                                            type="text"
                                                            placeholder="Enter Phone number"
                                                            name="phoneNumber"
                                                            id="phoneNumber"
                                                            className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                                                        />
                                                    </div>
                                                    {errors.phoneNumber && touched.phoneNumber ? (
                                                        <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
                                                    ) : null}
                                                </div>

                                                <div className="flex justify-end mt-10">
                                                    <button
                                                        type="button"
                                                        className="mr-7 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                        onClick={closeModal}
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                        {isLoading ? <Spinner /> : "Save"}
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
