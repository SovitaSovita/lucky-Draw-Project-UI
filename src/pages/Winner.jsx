import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import WinnerCard from "../component/WinnerCard";
import { get_winner, reset_winner } from "../redux/service/WinnerService";
import { notifySuccess } from "../redux/Constants";
import noData from '../assets/img/undraw_No_data_re_kwbl.png'

export default function Winner() {
  const [isOpen, setIsOpen] = useState(false);
  const [winnerList, setWinnerList] = useState([]);
  useEffect(() => {
    get_winner().then((res) => {
      setWinnerList(res?.data?.payload);
    });
  }, []);

  const resetWinner = () => {
    reset_winner().then((r) => {
      setWinnerList([])
      notifySuccess("reset winner Successfully.")
      toggleModal();
    });
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCancelDelete = () => {
    toggleModal();
    setTimeout(() => {
    }, 500)
  };
  return (
    <>
      <div className="p-6 pl-3 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg ">
          <Navbar />
          {/* winner */}
          <div className="flex justify-end mr-5">
            {
              winnerList.length <= 0 ? (null) : (
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  type="button"
                  onClick={toggleModal}
                >
                  Reset Winner
                </button>
              )
            }
            {isOpen && (
              <div
                id="popup-modal"
                tabIndex="-1"
                className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative m-auto w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-[20px] shadow">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      data-modal-hide="popup-modal"
                      onClick={() => toggleModal()}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 py-20 mt-52 text-center border rounded-[20px]">
                      <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 text-gray-400 w-14 h-14 "
                        fill="none"
                        stroke="red"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-text_normal ">
                        Are you sure you want to reset all{" "}
                        <span className="font-bold">winner?</span>
                      </h3>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        onClick={resetWinner}
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                        onClick={handleCancelDelete}
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pl-8 pr-4">
            <ol className="relative border-l border-gray-200 mt-5">
              {
                winnerList.length <= 0 ? (
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
        </div>
      </div>
    </>
  );
}
