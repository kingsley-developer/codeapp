"use client"
import React, {memo, useState, useCallback} from 'react'
import route from "../../../../../assets/User/routes/CreateRoom/JoinRoomPreview.module.scss"
import Button from "react-bootstrap/Button"
import { useAlert } from 'react-alert';
import Socket from "../../../../../ClientSocket"


type joinroomtype = {
  close: ()=>void,
  privacy: boolean
}
export default memo(function JoinRoomPreview({close, privacy}:joinroomtype) {
 
  const alert_msg = useAlert()
  const [loading, setLoading] = useState(false)
  const user_id = localStorage.getItem("user_id")
  const id = Number(user_id)
  const getAccessToken = localStorage.getItem("accessToken")    

 const JoinRoom = useCallback(()=>{
    if(id && getAccessToken){
        if(privacy){
            Socket.on()
        }
    }
 }, [])

  return (
    <div>
    <h1>Join Room Preview</h1>
    </div>
  )
})

