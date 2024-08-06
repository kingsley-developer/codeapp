"use client"
import {memo, useState, useEffect} from 'react'
import SlidingPanel from "react-sliding-side-panel"
import { NavLink, Outlet } from "react-router-dom"
import Right_scss from "../../../assets/User/UserPage-Part/RightPanel.module.scss"
import Footer2 from '../../FOOTER/Footer2'
import { useLocation } from "react-router-dom"

export default memo(function RightPanel() {
  const data = useLocation()
  const [user, setUser] = useState({
      user_id: 0,
      first_name: "",
      last_name: "",
      user_name: "",
      user_password: "",
      user_email: "",
      user_img: ""
  })

  useEffect(() => {
    async function getUser() {
      const userData = data.state.userdata.data[0] 
      setUser(userData)
    }
    getUser()
  }, []) 

    return (
      <div>
    <SlidingPanel
              type={"right"}
              isOpen={true}
              panelContainerClassName={Right_scss.panel_con}
          panelClassName="text-center"
          size={22}
        >  
          <div className={""}>
            <span className={"fs-5 lh-base fw-semibold text-white mt-5 font-family-codeapp"}>Welcome back 🖐 {user.user_name}</span>
              <ul className={Right_scss.panel_links}>
              <li>
                <NavLink to="." end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="notification" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Notification
                </NavLink>
              </li>
              <li>
                <NavLink to="createdrooms" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Created Rooms
                </NavLink>
            </li>
            <li>
                <NavLink to="joinedrooms" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Joined Rooms
                </NavLink>
            </li>
              <li>
                <NavLink to="rooms" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Rooms
                </NavLink>
            </li>
            <li>
                <NavLink to="settings" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Settings
                </NavLink>
            </li>
        </ul>
          </div>
    </SlidingPanel>
    <div className={`${Right_scss.panel_route} bg-dark container text-center pt-5 text-wrap text-break`}>
          <Outlet />
        </div>
        <Footer2/>
    </div>  
  )
})

