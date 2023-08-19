import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import { useSelector } from "react-redux";
import { get_list, insert_winner } from "../redux/service/TableListService";
import { notifyError } from "../redux/Constants";

import soundEffect from '../assets/sound/goodresult-82807.mp3'
import moto from '../assets/img/motos.png'
import logo from '../assets/img/frontend/logo.png'
import { Spinner } from "flowbite-react";
import CongratulationPopUp from "./CongratulationPopUp";
import Confetti from "./Confetti";
import { get_winner } from "../redux/service/WinnerService";
import { setWinner } from "../redux/slice/ListSlice";
import { useDispatch } from "react-redux";


function RandomPicker() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [isWinner, setIsWinner] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [storeWinner, setStoreWinner] = useState([])
  const intervalDuration = 25;
  const duration = 5500;
  let interval = null;

  const [items, setItems] = useState([])
  const [playSound, setPlaySound] = useState(false);
  const dispatch = useDispatch()

  const winner = useSelector((state) => state?.allList.winnerList)

  console.log("win ", winner)

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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

    clearInterval(interval);
    setIsWinner(false);
    interval = setInterval(setChoice, intervalDuration);
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
        setWinnerName(choice.name)

        setPlaySound(true)
        // openModal()
        insert_winner(formWinnerInfo).then((res) => {
          get_list().then((res) => {
            setItems(res.data.payload)
            stop();
          })
          get_winner().then((res) => {
            dispatch(setWinner(res?.data?.payload))
          });

        })
      }
    }, duration);
    setPlaySound(false)
  };

  const stop = () => {
    clearInterval(interval);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(interval);
    setIsRunning(false);
    setCurrentChoice("");
  };

  const pickChoice = () => {
    const choice = items[Math.floor(Math.random() * items?.length)];
    return choice.name;
  };

  const setChoice = () => {
    setCurrentChoice(pickChoice());
  };

  const choiceContent = currentChoice?.trim().length > 0 ? currentChoice : "?";

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
        <div className="main_draw_box mb-32">
          <img src={moto} alt="" className="object-cover w-full h-full" />

          <div className="name_box font-bold line-clamp-1 pb-1.5">
            {isWinner ? winnerName : choiceContent}
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
              winner.slice(0,5).map((items) => (
                <li className="flex justify-between">
                  <div>{items.name}</div>
                  <div>{items.phoneNumber}</div>
                </li>
              ))
            }

            <li className="text-brand-red text-border text-3xl mt-3 mb-2 font-bold italic">Vespa Winner</li>
            {
              winner.slice(5,7).map((items) => (
                <li className="flex justify-between">
                  <div>{items.name}</div>
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
