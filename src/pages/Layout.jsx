import React from 'react'
import SideBar from '../component/SideBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <SideBar/>
        <Outlet />
    </div>
  )
}
