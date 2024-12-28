"use client"
import {memo, useEffect, useState} from 'react'
import route from "../../../../assets/User/routes/Notification.module.scss"
import { Fade } from "react-awesome-reveal"
import axios from "axios"
export default memo(function Notification() {
  const [user_Msg, setUser_Msg] = useState([
    {
      msg_id:0,
      msg_name:"",
      msg_des:""
    }
  ])
  const getAccessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")
  const [show, setShow] = useState(true)
  const [show2, setShow2] = useState(true)


  useEffect(()=>{
    async function GetUserMsg(){
      if(user_id && getAccessToken){
        const waiting = await axios.get(`http://localhost:8999/get_user_msgs/${user_id}`)
      const data = await waiting.data
      if(data.check){
        setUser_Msg(data.data)
        setShow2(true)
    }
    else{
      setShow2(false)
    }
    }
    else{
      setShow(false)
    }
    }

    GetUserMsg()
  }, [user_Msg])

  const formatMsg = user_Msg.map((item:msgProp, id:number)=>{
    return(
      <div key={item.msg_id}>
        <h1 className="text-warning fw-semibold font-family-codeapp mt-5">Message Title: {item.msg_name}</h1>
        <p className="text-white fw-semibold font-family-codeapp mt-5">Description: {item.msg_des}</p>
      </div>
    )
  })

  if(!show){
    return(
      <div>
        <Fade cascade={true} damping={5} direction="down">
          <span className={`${route.downhandstyle_notifi}`}>👇</span>
        </Fade>
          <h2 className={`text-white ${route.empty_notify}`}>User not authenticated</h2>
    </div>
    )
  }

  return (
      <div>
          {(show2 == true ? formatMsg : <h2 className={`text-white ${route.empty_notify}`}>Empty Notification</h2>)}
    </div>
  )
})

