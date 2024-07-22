"use client"
import {memo} from "react"
import User_scss from "../../../assets/User/UserPage/UserPage.module.scss"
import SlidingPanel from "react-sliding-side-panel"
import { NavLink } from "react-router-dom"
export default memo(function UserPage() {
  return (
      <div>
          <SlidingPanel
              type={"right"}
              isOpen={true}
              panelContainerClassName={User_scss.panel_con}
              panelClassName="text-center text-yellow"
              size={30}>  
          <div>
              Hello world
          </div>
          </SlidingPanel>
          <ul className={User_scss.mag_right}>
              <li><NavLink to=".">Dashboard</NavLink></li>
        </ul>
    </div>
  )
})