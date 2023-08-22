import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { get_list, insert_winner } from "../redux/service/TableListService";
import { notifyError } from "../redux/Constants";

import soundEffect from '../assets/sound/goodresult-82807.mp3'
import moto from '../assets/img/motos.png'
import numberPhone from '../assets/img/NumberPhone.png'
import logo from '../assets/img/frontend/logo.png'


import Confetti from "./Confetti";
import { get_winner } from "../redux/service/WinnerService";
import { setWinner } from "../redux/slice/ListSlice";
import { useDispatch } from "react-redux";


function RandomPicker() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");
  const [currentChoiceNum, setCurrentChoiceNum] = useState("");

  const [winnerName, setWinnerName] = useState("");
  const [winnerNumber, setWinnerNumber] = useState("")

  const [isWinner, setIsWinner] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [storeWinner, setStoreWinner] = useState([])
  const intervalDuration = 25;
  const duration = 5500;
  let interval = null;
  let intervalNum = null;

  const [items, setItems] = useState([])
  const [playSound, setPlaySound] = useState(false);
  const dispatch = useDispatch()

  //use for set disable or enable fake winner
  const enabled = localStorage.getItem('enabled');

  let fakeWinner = {
    dateOfOrder: "2023-08-19T09:48:51.771+00:00",
    randomCustomer: "fakeWinner",
    no: 434,
    orderNo: "100000",
    phoneNumber: "000343543",
  }

  const winner = useSelector((state) => state?.allList.winnerList)

  useEffect(() => {
    getWinner()
  }, [])

  useEffect(() => {
    get_list()
      .then((res) => {
        if (res.data && res.data.payload) {
          const nameList = res.data.payload.map((data) => {
            return data;
          });
          setItems(nameList);
        }
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      });
  }, []);


  const isRunningRef = useRef(false);

  const start = (newItems) => {


    setIsWinner(false);
    interval = setInterval(setChoice, intervalDuration);
    intervalNum = setInterval(setChoiceNumber, intervalDuration);

    setIsRunning(true);
    isRunningRef.current = true;

    setTimeout(() => {
      if (isRunningRef.current) {
        const choice = newItems[Math.floor(Math.random() * newItems?.length)];
        let formWinnerInfo = {
          randomCustomer: choice.name,
          phoneNumber: choice.phoneNumber,
          dateOfOrder: choice.dateOfOrder,
          orderNo: choice.orderNo
        }
        setIsWinner(true)

        if (winner?.length == 6 && JSON.parse(enabled)) {
          console.log("fake aa")
          setWinnerName(fakeWinner.randomCustomer)
          setWinnerNumber(fakeWinner.phoneNumber)

          insert_winner(fakeWinner).then((res) => {
            get_list().then((res) => {
              setItems(res.data.payload)
              stop();
            })
            getWinner()
          })
        }
        else {
          console.log("real aa")
          setWinnerName(choice.name)
          setWinnerNumber(choice.phoneNumber)

          insert_winner(formWinnerInfo).then((res) => {
            get_list().then((res) => {
              setItems(res.data.payload)
              stop();
            })
            getWinner()

          })
        }

        setPlaySound(true)
        // openModal()
      }
    }, duration);
    setPlaySound(false)
  };

  const getWinner = () => {
    get_winner().then((res) => {
      dispatch(setWinner(res?.data?.payload))
    });
  }

  const stop = () => {
    clearInterval(interval);
    clearInterval(intervalNum);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(interval);
    setIsRunning(false);
    setCurrentChoice("");
  };

  const pickChoice = () => {
    const choice = items[Math.floor(Math.random() * items?.length)];
    return choice;
  };

  const setChoice = () => {
    setCurrentChoice(pickChoice().name);
  };
  const setChoiceNumber = () => {
    setCurrentChoiceNum(pickChoice().phoneNumber);
  };

  const choiceContent = currentChoice?.trim().length > 0 ? currentChoice : "?";
  const choiceContentNum = currentChoiceNum?.trim().length > 0 ? currentChoiceNum : "?";

  return (
    <>
      <div className="main-font-end bg-cover bg-bottom bg-hero-front">
        {
          isWinner ? <Confetti /> : null
        }
        {playSound && (
          <audio autoPlay>
            <source src={soundEffect} type="audio/mpeg" />
          </audio>
        )}
        <div className="main_draw_box mb-56">
          <img src={moto} alt="" className="object-cover w-full h-full" />

          <div className="name_box font-bold line-clamp-1 pb-1.5">
            {isWinner ? winnerName : choiceContent}
          </div>

          <div className="flex items-center justify-center">
            <div className="w-1/3 relative">
              <img src={numberPhone} alt="np" className="w-full absolute" />
              <p className="absolute left-0 right-0 top-4 flex justify-center items-center h-full font-bold">
                {isWinner ? winnerNumber : choiceContentNum}
              </p>
            </div>
          </div>

        </div>

        {/* Button Draw */}

        {isRunning ? null : (
          <div class="RandomPicker__controls rounded-xl mt-10 bg-gradient-to-t from-red-weight to-red-light p-1.5 shadow cursor-pointer"
            onClick={items.length <= 0 ? notifyError("No data") : () => { start(items) }}
          >
            <div class="flex h-full w-full items-center justify-center rounded-lg bg-white hover:bg-slate-200 back px-12 shadow border py-2 font-extrabold text-2xl">
              Draw
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="absolute bottom-4 mt-4 mr-4">
          <div className="w-28">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="absolute right-5 bottom-5 text-white text-lg width_winner w-[21%]">
          <ul className="p-6 bg-black-low border-2 border-red-weight">
            <li className="text-brand-red text-border text-3xl mb-2 font-bold italic">Watches Winner</li>
            {
              winner?.slice(0, 5).map((items, index) => (
                <li key={items.orderNo} className="flex justify-between font-bold">
                  <div>{index + 1}. {items.name}</div>
                  <div>{items.phoneNumber}</div>
                </li>
              ))
            }

            <li className="text-brand-red text-border text-3xl mt-3 mb-2 font-bold italic">Vespa Winner</li>
            {
              winner?.slice(5, 7).map((items, index) => (
                <li key={items.orderNo} className="flex justify-between font-bold">
                  <div>{index + 6}. {items.name}</div>
                  <div>{items.phoneNumber}</div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {/* <CongratulationPopUp isOpen={isOpen} closeModal={closeModal}/> */}
    </>
  );
}

RandomPicker.propTypes = {
  items: PropTypes.array,
  duration: PropTypes.number,
};

export default RandomPicker;
