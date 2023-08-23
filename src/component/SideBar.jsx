import React from "react";
import logo from "../assets/img/Artboard_3_2_213b1bea-2b74-4aab-86a5-1bfb64acc4a5_100x@2x.avif";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';


import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation();
  const currentPath = location.pathname;
  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login")
  }


  return (
    <div className="font-poppin">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-screen w-full p-6">
          <div className="bg-white flex flex-col justify-between shadow border w-full h-full rounded-xl px-4">
            {/* main sidebar */}
            <nav>
              {/* head sidebar */}
              <div className="border-b border-gray-500 py-8 px-6">
                {/* <p className='text-white text-xl text-center'>Lucky Draw</p> */}
                <img src={logo} alt="logo" className="" />
              </div>
              <ul className="text-sm list-none mt-5">
                <Link to={"/"}>
                  <li
                    className={
                      currentPath == "/"
                        ? "flex items-center bg-brand-red hover:bg-red-700 text-white rounded-lg px-4 py-3 mb-1 transition-all"
                        : "flex items-center rounded-lg px-4 py-3 mb-1 hover:bg-white-smoke transition-all"
                    }
                  >
                    <DashboardOutlinedIcon className="mr-2" />
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link to={"/manage"}>
                  <li
                    className={
                      currentPath == "/manage"
                        ? "flex items-center bg-brand-red hover:bg-red-700 text-white rounded-lg px-4 py-3 mb-1 transition-all"
                        : "flex items-center rounded-lg px-4 py-3 mb-1 hover:bg-white-smoke transition-all"
                    }
                  >
                    <ChecklistOutlinedIcon className="mr-2" />
                    <span>Manage list</span>
                  </li>
                </Link>
                <Link to={"/winner"}>
                  <li
                    className={
                      currentPath == "/winner"
                        ? "flex items-center bg-brand-red hover:bg-red-700 text-white rounded-lg px-4 py-3 mb-1 transition-all"
                        : "flex items-center rounded-lg px-4 py-3 mb-1 hover:bg-white-smoke transition-all"
                    }
                  >
                    <EmojiEventsOutlinedIcon className="mr-2" />
                    <span>Winner</span>
                  </li>
                </Link>
                <Link to={"/default"}>
                  <li
                    className={
                      currentPath == "/default"
                        ? "flex items-center bg-brand-red hover:bg-red-700 text-white rounded-lg px-4 py-3 mb-1 transition-all"
                        : "flex items-center rounded-lg px-4 py-3 mb-1 hover:bg-white-smoke transition-all"
                    }
                  >
                    <PolylineOutlinedIcon className="mr-2" />
                    <span>Default Winner</span>
                  </li>
                </Link>
                <Link to={"/account"}>
                  <li
                    className={
                      currentPath == "/account"
                        ? "flex items-center bg-brand-red hover:bg-red-700 text-white rounded-lg px-4 py-3 mb-1 transition-all"
                        : "flex items-center rounded-lg px-4 py-3 mb-1 hover:bg-white-smoke transition-all"
                    }
                  >
                    <PersonOutlineOutlinedIcon className="mr-2" />
                    <span>Account</span>
                  </li>
                </Link>
              </ul>
            </nav>
            <button
              className="flex items-center justify-center mb-4 bg-red-100 w-full rounded-lg self-center px-4 py-1.5 hover:bg-red-200 transition-all"
              onClick={logout}
            >
              <ExitToAppOutlinedIcon className="mr-2 text-red-600" />
              <span className="text-red-600">Log out</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
