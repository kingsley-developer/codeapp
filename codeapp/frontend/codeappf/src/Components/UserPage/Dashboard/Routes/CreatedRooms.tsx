"use client"
import {memo, useState, useEffect, useCallback} from 'react'
import route from "../../../../assets/User/routes/CreatedRooms.module.scss"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import CreateRoomPopUp from './CreateRoomParts/CreateRoomPopUp'
import { useAppSel } from '../../../../codeapp-redux-store/Typed-hooks/hooks'
import axios from "axios"
import "../../../../assets/globalcss/global.css"
import { ColorRing } from "react-loader-spinner"
import {Fade} from "react-awesome-reveal"
import {useNavigate, Outlet} from "react-router-dom"

export default memo(function CreatedRooms() {
  const [create, setCreate] = useState(false)
  const closeCreateModal = () => setCreate(false)
  const [refresh, setRefresh] = useState(false)
  const toOpenRoom = useNavigate()
  const [room, setRoom] = useState([{
    created_room_id: 0,
    room_name: "",
    room_des: "",
    room_tag: "",
    room_visibility: false,
    room_total_usr: 0,
  }])
  const userDetails = useAppSel(state => state.userdata)
  const getAccessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")
  const [show, setShow] = useState(false)
  const [showRoom, setShowRoom] = useState(false)
  const [eMsg, setEMsg] = useState("")
  const [loading, setLoading] = useState(false)
  
  const openCreatedRoom = useCallback((id:number, room_name:string)=>{
    if(getAccessToken && user_id){
      localStorage.setItem("roomId", String(id))
      localStorage.setItem("room_name", room_name)
      setShowRoom(true)
      const room_id = localStorage.getItem("roomId")
      toOpenRoom(`/dashboard/${user_id}/createdrooms/${Number(room_id)}`)
    }
    
  }, [])

  const roomSetup = room.map((data, index:number) => {
    return (
      <div>
      <Fade cascade={true} damping={5} direction="down">
          <Card className={`text-center mt-5`} key={index}>
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
        <Card.Footer>
          Room Total users: {data.room_total_usr}
        </Card.Footer>
        <Button onClick={()=>openCreatedRoom(data.created_room_id,data.room_name)} variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>View Room</Button>
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

  useEffect(() => {
    async function getUserRoom() {
      try{
        if (getAccessToken && user_id) {
          setLoading(true)
          setEMsg("")
            const getUserRooms = await axios.get(`http://localhost:8999/get_created_rooms/?user_id=${Number(user_id)}`)
            const data:userRoomData = await getUserRooms.data
          if (data.check) {
            setEMsg("")
            setLoading(false)
            setShow(true)
            setRoom(data.data)
          }
          else{
          setEMsg("")
            setLoading(false)
            setShow(false)
          }
        } 
      }
      catch (e: any) {
        setLoading(false)
        setEMsg(String(e))
      }
         
    }  
     getUserRoom()  
  }, [refresh]) 
  
  if (loading) {
  
    return (
    <div>
    <ColorRing
    visible={true}
    height={"380"}
    width={"380"}
    ariaLabel='Loading rooms'
    wrapperClass={route.cloadingclass}
    colors={["yellow", "red", "green", "gold", "white"]}
    />
    <h2 className="text-white fs-3 lh-base font-family-codeapp mt-5">Loading Rooms</h2>
    </div>
  )
  }
  else {
    if(showRoom){
      return (
        <div>
          <Outlet/>
        </div>
      )
    }
  return (
      <div className="container">
        <Card className={`text-center w-75 mt-5 ${route.create_Room_card_main}`}>
        <Card.Header className="text-dark bg-warning fs-3 lh-base font-family-codeapp">Create Room</Card.Header>
        <Card.Body>
          <Card.Title className="text-white fs-4 lh-base fw-semibold font-family-codeapp">Get Started By Creating A Room</Card.Title>
          <Card.Text className="text-white lh-base fw-semibold font-family-codeapp">
            Click the create room button below to create your newly created room.
          </Card.Text>
        </Card.Body>
        <Button onClick={() => setCreate(o => !o)} variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>Create Room</Button>
      </Card>
      <div className={`mt-5 ${route.create_room_card}`}>
        {show && roomSetup}
      </div>
      {(showMessage() == undefined ? "" : showMessage())}
      {(eMsg == "" ? "" : <h2 className="text-white lh-base fw-semibold font-family-codeapp">{eMsg}</h2>)}

      <Popup
     open={create}
     closeOnDocumentClick
      onClose={closeCreateModal}
      position={"center center"}
      modal={true}
      >     
      <CreateRoomPopUp close={closeCreateModal} fresh={setRefresh}/>
      </Popup>
    </div>
  )  
  }
  
})

