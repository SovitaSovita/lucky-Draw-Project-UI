import React, {useState,useEffect} from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import { Link } from 'react-router-dom';
import { get_winner } from '../redux/service/WinnerService';
import { get_list } from "../redux/service/TableListService";

export default function DashboardCard() {
    const [winnerList, setWinnerList] = useState([]);
    const [customerList, setListCustomers]= useState([])
    useEffect(() => {
        get_winner()
          .then((res) => {
            if (res.data?.payload) {
              setWinnerList(res.data.payload);
            }
          })
          .catch((error) => {
            console.error("Error fetching winner data:", error);
          });
      }, []);
      
      const winnerListCount = winnerList.length;
      
      useEffect(() => {
        get_list()
          .then((res) => {
            if (res.data?.payload) {
              setListCustomers(res.data.payload);
            }
          })
          .catch((error) => {
            console.error("Error fetching customer list:", error);
          });
      }, []);
      

      
    const customerListCount = customerList.length;

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-6 md:gap-4 sm:gap-2'>
            <div className="rounded-xl bg-gradient-to-r from-brand-red to-[#FF694F] shadow-md border">
                <div className="flex justify-between items-center">
                    <div className='py-4 px-6 text-base-100'>
                        <h2 className="card-title uppercase">Event</h2>
                        <span>Event name</span>
                    </div>
                    <div>
                        <FileDownloadOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                    </div>
                </div>
            </div>
            <Link
             to="/winner"
            >
            <div className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md border">
                <div className="flex justify-between items-center">
                    <div className='py-4 px-6 text-base-100'>
                        <h2 className="card-title uppercase">Winner</h2>
                        <span>{winnerListCount > 1 ? (winnerListCount + ' customers') : ('0'+winnerListCount + ' customer')}</span>
                    </div>
                    <div>
                        <EmojiEventsOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                    </div>
                </div>
            </div>
            </Link>
         
            <Link
             to="/manage"
            >
            <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md border">
                <div className="flex justify-between items-center">
                    <div className='py-4 px-6 text-base-100'>
                        <h2 className="card-title uppercase">Totally Customer</h2>
                        <span>{customerListCount > 1 ? (customerListCount + ' customers') : ('0'+customerListCount + ' customer')}</span>
                    </div>
                    <div>
                        <FolderCopyOutlinedIcon sx={{ fontSize: 100 }} className='opacity-20 rotate-12' />
                    </div>
                </div>
            </div>
            </Link>
          
        </div>
    )
}
