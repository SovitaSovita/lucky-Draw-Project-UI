import React, { useEffect, useState } from 'react'
import { setEnabled } from '../redux/slice/SwitchSlice';
import { Switch } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Navbar from '../component/Navbar';
import { Field, Form, Formik } from 'formik';
import { WinnerSchema } from '../utils/Validation';
import { Button } from '@mui/material';

import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { notifyError, notifySuccess } from '../redux/Constants';
import AlertMesages from '../component/AlertMesages';

export default function DefaultWinner() {

    const dispatch = useDispatch()

    const enabled = useSelector((state) => state.switch.enabled);

    // Load initial state from localStorage
    useEffect(() => {
        const storedEnabled = localStorage.getItem('enabled');
        if (storedEnabled !== null) {
            dispatch(setEnabled(storedEnabled === 'true'));
        }
    }, [dispatch]);

    const handleEnabledChange = () => {
        const newEnabled = !enabled;

        // Update state in Redux store
        dispatch(setEnabled(newEnabled));

        // Update localStorage
        localStorage.setItem('enabled', newEnabled.toString());
    };

    const onSubmitWinner = (values) => {
        localStorage.setItem('winner', JSON.stringify(values))
        notifySuccess("Default Winner have been save")
    }

    const get_Winner_from_storage = localStorage.getItem('winner');
    const fake = JSON.parse(get_Winner_from_storage)

    return (
        <div>
            <AlertMesages />
            <div className='p-6 pl-3 sm:ml-64'>
                <div className="py-4 px-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg">
                    <Navbar />

                    <div className="flex justify-between bg-white py-2 px-4 rounded-lg w-1/2">
                        <span>Default Winner (7th)</span>
                        <Switch
                            checked={enabled}
                            onChange={handleEnabledChange}
                            className={`${enabled ? 'bg-blue-600' : 'bg-gray-300'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>

                    {
                        enabled ? (
                            <Formik
                                initialValues={{
                                    name: fake?.name,
                                    orderDate: fake?.orderDate,
                                    orderNo: fake?.orderNo,
                                    phoneNumber: fake?.phoneNumber,
                                }}
                                validationSchema={WinnerSchema}
                                onSubmit={onSubmitWinner}
                            >
                                {({ errors, touched }) => (
                                    <Form
                                        className='bg-white p-8 rounded-lg shadow-sm mt-8 w-1/2'
                                    >

                                        <div className="mb-4">
                                            <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                                                {/* <LockOutlinedIcon className="text-gray-500" /> */}
                                                <Field
                                                    type="date"
                                                    name="orderDate"
                                                    id="orderDate"
                                                    className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                                                />
                                            </div>
                                            {errors.orderDate && touched.orderDate ? (
                                                <div className="text-red-500 text-sm">
                                                    {errors.orderDate}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                                                <Field
                                                    type="number"
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
                                                    type="number"
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

                                        <div className="flex justify-end mt-6">
                                            <Button
                                                type="submit"
                                                variant="contained" endIcon={<SaveAsOutlinedIcon />}>
                                                Save
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        ): null
                    }
                </div>
            </div>
        </div>
    )
}
