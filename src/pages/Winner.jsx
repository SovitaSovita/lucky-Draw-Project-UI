import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import WinnerCard from "../component/WinnerCard";
import { get_winner, reset_winner } from "../redux/service/WinnerService";
import { notifySuccess } from "../redux/Constants";
import noData from '../assets/img/undraw_No_data_re_kwbl.png'
import { Spinner } from "flowbite-react";
import { Dialog, Transition } from "@headlessui/react";

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

  return (
    <>
      <div className="p-6 pl-3 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg ">
          <Navbar />
          {/* winner */}
          <div className="flex justify-end">
            {
              winnerList?.length <= 0 ? (null) : (
                <button
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-red-600 mr-4 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Reset Winners
                </button>
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
