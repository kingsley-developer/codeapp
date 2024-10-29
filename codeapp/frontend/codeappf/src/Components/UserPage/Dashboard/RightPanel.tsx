"use client"
import {memo, useState, useEffect} from 'react'
import SlidingPanel from "react-sliding-side-panel"
import { NavLink, Outlet } from "react-router-dom"
import Right_scss from "../../../assets/User/UserPage-Part/RightPanel.module.scss"
import Footer2 from '../../FOOTER/Footer2'
import { useLocation, useParams } from "react-router-dom"
import { MdDashboard } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineJoinLeft } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ProfileImage from "@daym3l/react-profile-image"
import "../../../@types/import.d.ts"
import d_img from "../../../assets/default-img/a.png"
import { useAppDis, useAppSel } from '../../../codeapp-redux-store/Typed-hooks/hooks';
import { userDataForever } from '../../../codeapp-redux-store/userprofile/user_profile.ts'
import axios from "axios"
import Button from "react-bootstrap/Button"

async function getImages(base64Img: any, fileImg: any) {
  console.log(base64Img, fileImg)
}

const img_upload_s = {
        width: "80%",
        height: "70%",
        borderRadius: "70%",
        border: "4px solid gold",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
}

export default memo(function RightPanel() {
  const data = useLocation()

  const p = useParams()
  const [type, setType] = useState("")

  const dispatch = useAppDis()
  const userDetails = useAppSel(state => state.userdata)
  const user: userForeverApp = userDetails
  const getAccessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")
  const room_id = localStorage.getItem("roomId")

  function clearStorage(){
    localStorage.removeItem("roomId")
    localStorage.removeItem("user_id")
    localStorage.removeItem("accessToken")
    alert("Successfully logged out")
  }

  useEffect(() => {
    async function getUser() {

      try{
        const exist = data.state.exist
        if(exist){
      const getSavedUser = await axios.get(`http://localhost:8999/get_saved_user/?user_id=${Number(p.userid)}`)
      const data2: savedUserData = await getSavedUser.data
      if (data2.check) {
       const userData = data2.data[0] 
      dispatch(userDataForever(userData))
      setType(data.state.type)  
      }
      }
      }
      catch (e: any) {
    
        if (getAccessToken && user_id) {
        const getSavedUser = await axios.get(`http://localhost:8999/get_saved_user/?user_id=${Number(user_id)}`)
            const data2: savedUserData = await getSavedUser.data
            console.log(data2)
            if (data2.check) {
              const userData = data2.data[0] 
              dispatch(userDataForever(userData))
              const tempType = ""
              setType(tempType)
              return 
            }
      }     
    }  
      
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
          size={28}
        >  
          <div className={""}>
            {
              type == "signup" ?
                <span className={"fs-5 lh-base fw-semibold text-white mt-5 font-family-codeapp"}>
                  Hello {user.user_name}
                </span> :
                <span className={"fs-5 lh-base fw-semibold text-white mt-5 font-family-codeapp"}>
                Welcome back 🖐 {user.user_name}
                </span>}
          <div className={Right_scss.setup_img_style}>
            <ProfileImage
            camera={true}
            styles={img_upload_s}
            defaultImage={d_img}
            returnImage={getImages}
            uploadBtnProps={{variant: "contained", label: "Upload Photo", color: "primary", size:"small"}}
            cameraBtnProps={{ variant: "contained", label: "Open Camera", color: "primary", size:"small"}}
            takeBtnProps={{ variant: "contained", label: "Take Photo", color:"primary", size:"small"}}
            cancelBtnProps={{variant:"contained", label:"Cancel Photo", color:"primary", size:"small"}}
            isNotImgErrorMsg={"Not an image"}
            />
            </div>
              <ul className={Right_scss.panel_links}>
              <li>
                <NavLink to="." end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Dashboard<MdDashboard />
                </NavLink>
              </li>
              <li>
                <NavLink to="notification" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Notification<IoIosNotifications />
                </NavLink>
              </li>
              <li>
                <NavLink to="createdrooms" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Created Rooms<IoIosCreate />
                </NavLink>
            </li>
            <li>
                <NavLink to="joinedrooms" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Joined Rooms<MdOutlineJoinLeft />
                </NavLink>
            </li>
              <li>
                <NavLink to="rooms" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Rooms<FaLayerGroup />
                </NavLink>
            </li>
            <li>
                <NavLink to="settings" end className={({ isActive }) => isActive ? `fs-4 font-family-codeapp nav-link fw-bold px-2 text-warning` : `font-family-codeapp nav-link fw-bold px-2 fs-4 text-white`}>
                Settings<IoMdSettings/>
                </NavLink>
            </li>
        </ul>
        <Button onClick={clearStorage} variant="warning" className={`mb-4 w-50 text-center fw-bold`} active={true}>Log Out</Button>
          </div>
    </SlidingPanel>
    <div className={`${Right_scss.panel_route} bg-dark container-fluid text-center text-wrap text-break`}>
          <Outlet />
        </div>
        <Footer2/>
    </div>  
  )
})

