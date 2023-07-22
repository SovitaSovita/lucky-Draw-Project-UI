import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import { useSelector } from "react-redux";
import { get_list, insert_winner } from "../redux/service/TableListService";
import { notifyError } from "../redux/Constants";

function RandomPicker() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [isWinner,setIsWinner] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [storeWinner,setStoreWinner] = useState([])
  const intervalDuration = 25;
  const duration = 3500;
  let interval = null;

  const [items, setItems] = useState([])

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
        insert_winner(formWinnerInfo).then(()=>{
          get_list().then((res) => {
            setItems(res.data.payload)
          stop();
        })
        
        })
      }
    }, duration);
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

  // const zoomOut = () => {
  //   const button = document.querySelector(".fullscreen-button");
  //   setIsFullScreen(true);
  //   if (button) {
  //     if (button.requestFullscreen) {
  //       button.requestFullscreen();
  //     } else if (button.mozRequestFullScreen) {
  //       button.mozRequestFullScreen();
  //     } else if (button.webkitRequestFullscreen) {
  //       button.webkitRequestFullscreen();
  //     } else if (button.msRequestFullscreen) {
  //       button.msRequestFullscreen();
  //     }
  //   }
  // };

  // const zoomIn = () => {
  //   const exitFullscreen =
  //     document.exitFullscreen ||
  //     document.mozCancelFullScreen ||
  //     document.webkitExitFullscreen ||
  //     document.msExitFullscreen;

  //   if (exitFullscreen) {
  //     exitFullscreen.call(document);
  //   }

  //   setIsFullScreen(false);
  // };

  return (
    <div className="main-font-end">
      <div
        className={
          isFullScreen
            ? "RandomPicker fullscreen-button"
            : "RandomPicker fullscreen-button"
        }
        style={{ backgroundColor: isFullScreen ? "#FF422E" : "" }}
      >
        {/* Zoom */}
        {/* <div className=" text-white text-sm absolute top-0 right-0 mt-4 mr-4">
          {!isFullScreen ? (
            <button onClick={zoomOut}>
              <CropFreeOutlinedIcon className="mr-2" />
            </button>
          ) : (
            <button onClick={zoomIn}>
              <ZoomInMapOutlinedIcon className="mr-2" />
            </button>
          )}
        </div> */}

        {/* Luckydraw text */}
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="739px"
            height="137px"
          >
            <text
              kerning="auto"
              fontFamily="Myriad Pro"
              strokeWidth="16px"
              stroke="rgb(244, 183, 30)"
              fillOpacity="0"
              strokeOpacity="1"
              fontSize="10px"
              x="6px"
              y="75.072px"
            >
              <tspan
                fontSize="80px"
                fontFamily="Angkor Sovann Fantasy_02"
                fill="#FFFFFF"
              >
                Lucky Draw
              </tspan>
            </text>
            <text
              kerning="auto"
              fontFamily="Myriad Pro"
              fill="rgb(0, 0, 0)"
              fontSize="10px"
              x="6px"
              y="75.072px"
            >
              <tspan
                fontSize="80px"
                fontFamily="Angkor Sovann Fantasy_02"
                fill="#FFFFFF"
              >
                Lucky Draw
              </tspan>
            </text>
          </svg>
        </div>

        {/* Display Winner */}
        <div
          style={{ boxShadow: "8px 8px 0px rgba(0, 8, 0, 0.4)" }}
          className="relative bg-[#FFBF1F] mb-8 rounded-xl w-[740px] h-[160px] flex justify-center items-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-dotted border-[10px] border-white rounded-xl w-[720px] h-[140px]">
              <div className=" rounded-xl w-full h-full"></div>
            </div>
          </div>
          <div className="flex RandomPicker__choice bg-white w-[690px] h-[110px] rounded-md text-center justify-center items-center text-black">
            <span className="RandomPicker__choiceItem text-[43px]">
              {isWinner? winnerName : choiceContent}
            </span>
          </div>
        </div>

        {/* Button Draw */}
        <div className="RandomPicker__controls">
          {!isRunning ? (
            <button
              style={{
                visibility: isRunning ? "invisible" : "visible",
                boxShadow: "8px 8px 0px rgba(0, 8, 0, 0.4)",
              }}
              className="text-white mt-4 py-3 px-[140px] bg-[#FFBF1F] hover:bg-[#FFCA28] rounded-lg text-[24px]"
              onClick={items.length <=0 ? notifyError("No data") : ()=>{start(items)}}
            >
              {isRunning ? null : "Draw"}
            </button>
          ) : null}
        </div>

        {/* Copyright */}
        <div className="text-white text-sm absolute bottom-2 mt-4 mr-4">
          © Klassy Watches・
        </div>
      </div>
    </div>
  );
}

RandomPicker.propTypes = {
  items: PropTypes.array,
  duration: PropTypes.number,
};

export default RandomPicker;
