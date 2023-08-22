import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import WinnerCard from "../component/WinnerCard";
import { get_winner, reset_winner } from "../redux/service/WinnerService";
import { notifySuccess } from "../redux/Constants";
import noData from '../assets/img/undraw_No_data_re_kwbl.png'
import { Spinner } from "flowbite-react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { setEnabled } from "../redux/slice/SwitchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Winner() {
  const [winnerList, setWinnerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    get_winner().then((res) => {
      setIsLoading(false)
      setWinnerList(res?.data?.payload);
    });
  }, []);

  const resetWinner = () => {
    setIsLoading(true)
    reset_winner().then((r) => {
      setIsLoading(false)
      setWinnerList([])
      notifySuccess("Reset winner Successfully.")
      closeModal()
    });
  };
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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

  return (
    <>
      <div className="p-6 pl-3 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg ">
          <Navbar />


          <div className="flex justify-between bg-white py-2 px-4 rounded-lg w-1/4">
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

          {/* winner */}
          <div className="flex justify-end">
            {
              winnerList?.length <= 0 ? (null) : (
                <div className="">
                  <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-red-600 mr-4 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Reset Winners
                  </button>
                </div>

              )
            }
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                          className="text-lg text-center font-medium leading-6 text-gray-900"
                        >
                          Are you sure you want to reset this data?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-center text-gray-500">
                            This action will delete All your data from table. <br /> Are you sure you want to proceed
                          </p>
                        </div>

                        <div className="mt-4 flex justify-evenly">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={resetWinner}
                          >
                            {isLoading ? <Spinner /> : "Yes, I'm sure."}
                          </button>

                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
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

          {
            isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <div className="pl-8 pr-4">
                <ol className="relative border-l border-gray-200 mt-5">
                  {
                    winnerList?.length <= 0 ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <img src={noData} alt="no_data" className="w-44" />
                          <div>No winner.</div>
                        </div>
                      </div>
                    ) : (
                      winnerList?.map((item, index) => (
                        <WinnerCard items={item} key={index} order={index + 1} />
                      ))
                    )
                  }
                </ol>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}
