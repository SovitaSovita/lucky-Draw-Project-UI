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
        // console.log(formWinnerInfo)
        
        setPlaySound(true)
        // openModal()
        insert_winner(formWinnerInfo).then(() => {
          get_list().then((res) => {
            setItems(res.data.payload)
            stop();
          })

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
        <div className="main_draw_box z-10 mb-32">
          <img src={moto} alt="" className="object-cover w-full h-full" />

          <div className="name_box font-bold line-clamp-1 pb-1.5">
            {isWinner ? winnerName : choiceContent}
          </div>
        </div>

        {/* Button Draw */}

        {isRunning ? null : (
          <div class="RandomPicker__controls rounded-xl mt-10 bg-gradient-to-t from-red-weight to-red-light p-1.5 shadow cursor-pointer z-10"
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
