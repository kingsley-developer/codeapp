"use client"
import {memo, useEffect, useState, useCallback} from 'react'
import route from "../../../../assets/User/routes/JoinedRooms.module.scss"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {Fade} from "react-awesome-reveal"
import axios from "axios"
import { ColorRing } from "react-loader-spinner"
import {useNavigate, Outlet,useLocation} from "react-router-dom"

export default memo(function JoinedRooms() {
  const user_id = localStorage.getItem("user_id")
  const [loading, setLoading] = useState(false)
  const [auth_Msg, setAM] = useState("")
  const toOpenRoom = useNavigate()
  const state = useLocation()
  const [showRoom, setShowRoom] = useState(false)
  const [showRoom2, setShowRoom2] = useState(false)
  const [err_Msg, setE] = useState("")
  const [show, setShow] = useState(false)
  const getAccessToken = localStorage.getItem("accessToken")
  const [room, setRoom] = useState([{
    created_room_id: 0,
    room_name: "",
    room_des: "",
    room_tag: "",
    room_visibility: false,
  }])
  const openJoinedRoom = useCallback((id:number, room_name:string)=>{
    if(getAccessToken && user_id){
      localStorage.setItem("roomId", String(id))
      localStorage.setItem("room_name", room_name)
      setShowRoom(true)
      const room_id = localStorage.getItem("roomId")
      toOpenRoom(`/dashboard/${user_id}/joinedrooms/${Number(room_id)}`)
    }
    
  }, [])

  async function deleteRoom(room_id:number){
    console.log(room_id)
  }

  const roomsSetup = room.map((data, index:number) => {
    return (
      <div>
      <Fade cascade={true} damping={5} direction="down" key={data.created_room_id}>
          <Card className={`text-center mt-5`}>
        <Card.Header className="text-dark bg-warning fs-3 lh-base font-family-codeapp">Room ID.{data.created_room_id}</Card.Header>
        <Card.Body>
          <Card.Title className="text-dark fs-4 lh-base fw-semibold font-family-codeapp">Room Name: {data.room_name}</Card.Title>
          <Card.Title className="text-dark fs-4 lh-base fw-semibold font-family-codeapp">Room Tag: {data.room_tag}</Card.Title>
          <Card.Text className="text-dark lh-base fw-semibold font-family-codeapp">
            {data.room_des}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          Room Visibility: {(data.room_visibility == true ? "Public" : "Private") }
        </Card.Footer>
        <Button onClick={()=>openJoinedRoom(data.created_room_id,data.room_name)} variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>View Room</Button>
        <Button onClick={()=>deleteRoom(data.created_room_id)} variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>Delete Room</Button>
      </Card>
      </Fade>
      </div>
    )
  })
  const showMessage =()=>{
    if(!show){
      return <h2 className="text-white lh-base fw-semibold font-family-codeapp">Empty Rooms</h2>
    }
  }
  useEffect(()=>{

    async function getState(){
      try{
        setShowRoom2(state.state.enable)
      }
      catch(e:any){
        setShowRoom2(false)
      }
    }
    async function getJoinedRooms() {
      try{
        if (getAccessToken && user_id) {
        setLoading(true)
        setE("")
        setAM("")
        const fetching = await axios.get(`http://localhost:8999/get_joined_rooms/?user_id=${user_id}`)
        const data:AllRoomsData2 = await fetching.data
        
        if(data.check){
          setLoading(false)
          setRoom(data.data)
          setShow(true)

        }
        else{
          setLoading(false)
          setShow(false)
        }
        }
        else{
          setAM("User not Authenticated")
        }
      }
      catch(e:any){
      setRoom([])
        setLoading(false)
        setShow(false)
        setAM("")
        setE(String(e))
      }
    }
    getState()
    getJoinedRooms()
  }, [])

  if (loading) {
  
    return (
    <div>
    <ColorRing
    visible={true}
    height={"380"}
    width={"380"}
    ariaLabel='Loading rooms'
    wrapperClass={route.rloadingclass}
    colors={["yellow", "red", "green", "gold", "white"]}
    />
    <h2 className="text-white fs-3 lh-base font-family-codeapp mt-5">Loading Rooms</h2>
    </div>
  )
  }
  else{
    if(showRoom){
      return (
        <div className={route.join_route}>
          <Outlet/>
        </div>
      )
    }
    if(showRoom2){
      return (
        <div className={route.join_route}>
          <Outlet/>
        </div>
      )
    }
    return (
      <div className={`container`}>
        <h2 className="text-white fs-3 lh-base font-family-codeapp mt-5">Joined Rooms</h2>
        <div className={`mt-5 ${route.rooms_card}`}>
          {show && roomsSetup}
        </div>
        {(showMessage() == undefined ? "" : showMessage())}
        {(err_Msg == "" ? "" : <h2 className="text-white lh-base fw-semibold font-family-codeapp">{err_Msg}</h2>)}
        {(auth_Msg == "" ? "" : <h2 className="text-white lh-base fw-semibold font-family-codeapp">{auth_Msg}</h2>)}
      </div>
    )
  }
})

