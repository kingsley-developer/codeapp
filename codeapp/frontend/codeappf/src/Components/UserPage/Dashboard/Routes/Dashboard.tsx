"use client"
import {memo, useState, useEffect, useCallback} from 'react'
import route from "../../../../assets/User/routes/Dashboard.module.scss"
import axios from "axios"
import {Fade} from "react-awesome-reveal"
import Card from "react-bootstrap/Card"
import {useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button"
export default memo(function Dashboard() {
  const toOpenRoom = useNavigate()
  const [countTotalUser, SetCountTotalUser] = useState(0)
  const [countUserCreatedRoom, SetCountUserCreatedRoom] = useState(0)
  const [countUserJoinedRoom, SetCountUserJoinedRoom] = useState(0)
  const getAccessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")
  const [room, setRoom] = useState([{
    created_room_id: 0,
    room_name: "",
    room_des: "",
    room_tag: "",
    room_visibility: false,
    room_total_usr: 0,
  }])

  const [room2, setRoom2] = useState([{
    created_room_id: 0,
    room_name: "",
    room_des: "",
    room_tag: "",
    room_visibility: false,
  }])

  useEffect(()=>{
    async function getRecentCreatedRooms() {
      try{
        if (getAccessToken && user_id) {
        const fetching = await axios.get(`http://localhost:8999/get_user_recent_created_rooms/?id=${user_id}`)
        const data:AllRoomsData = fetching.data
        if(data.check){
          setRoom(data.data)
        }
        else{
        setRoom([{
          created_room_id: 0,
          room_name: "",
          room_des: "",
          room_tag: "",
          room_visibility: false,
          room_total_usr: 0,
        }])
        }
      }
    }
      catch(e:any){
      setRoom([{
        created_room_id: 0,
  room_name: "",
  room_des: "",
  room_tag: "",
  room_visibility: false,
  room_total_usr: 0,
      }])
      }
    }

    async function getRecentJoinedRooms() {
      try{
        if (getAccessToken && user_id) {
        const fetching = await axios.get(`http://localhost:8999/get_user_recent_joined_rooms/?id=${user_id}`)
        const data:AllJoinedRecentRoomsData = fetching.data
        if(data.check){
          setRoom2(data.data)
        }
        else{
        setRoom2([{
          created_room_id: 0,
          room_name: "",
          room_des: "",
          room_tag: "",
          room_visibility: false,
        }])
        }
      }
    }
      catch(e:any){
      setRoom2([{
        created_room_id: 0,
  room_name: "",
  room_des: "",
  room_tag: "",
  room_visibility: false,
      }])
      }
    }
    async function GetTotalUsers(){
      if(user_id && getAccessToken){
        const waiting = await axios.get("http://localhost:8999/get_all_user_count")
      const data = await waiting.data
      if(data.check){
        SetCountTotalUser(data.count)
      }
      }
    }
    async function GetCreatedRoomsCount(){
      if(user_id && getAccessToken){
        const waiting = axios.get(`http://localhost:8999/get_created_rooms_count/?id=${user_id}`)
      const data = (await waiting).data
      if(data.check){
        SetCountUserCreatedRoom(data.count)
      }
      }
    }

    async function GetJoinedRoomsCount(){
      if(user_id && getAccessToken){
        const waiting = axios.get(`http://localhost:8999/get_joined_rooms_count/?id=${user_id}`)
      const data = (await waiting).data
      if(data.check){
        SetCountUserJoinedRoom(data.count)
      }
      }
    }
    GetTotalUsers()
    GetCreatedRoomsCount()
    GetJoinedRoomsCount()
    getRecentCreatedRooms()
    getRecentJoinedRooms()
  }, [])

  const openJoinedRoom = useCallback((id:number, room_name:string)=>{
    if(getAccessToken && user_id){
      localStorage.setItem("roomId", String(id))
      localStorage.setItem("room_name", room_name)
      const room_id = localStorage.getItem("roomId")
      toOpenRoom(`/dashboard/${user_id}/joinedrooms/${Number(room_id)}`,{state:{enable:true}})
    }
    
  }, [])

  const recentRoom = room.map((data, index:number) => {
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
        <Card.Footer>
          Room Total users: {data.room_total_usr}
        </Card.Footer>
        <Button variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>View Room</Button>
      </Card>
      </Fade>
      </div>
    )
  })

  const recentJoinedRoom = room2.map((data, index:number) => {
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
        <Button  onClick={()=>openJoinedRoom(data.created_room_id,data.room_name)} variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>View Room</Button>
      </Card>
      </Fade>
      </div>
    )
  })

  return (
    <div>
      <h1 className="text-white fw-semibold font-family-codeapp">Welcome to the Dashboard</h1>
      {(countTotalUser > 1 ? <h2 className="text-white fw-semibold font-family-codeapp mt-5">We have {countTotalUser} users in Codeapp.com</h2> :
       <h2 className="text-white fw-semibold font-family-codeapp mt-5">We have {countTotalUser} user in Codeapp.com</h2>)}
       
       <h1 className="text-warning fw-semibold font-family-codeapp mt-5">Your Created Rooms Count</h1>
       {(countUserCreatedRoom > 1 ? <h2 className="text-white fw-semibold font-family-codeapp mt-5">You have {countUserCreatedRoom} created rooms</h2> :
       <h2 className="text-white fw-semibold font-family-codeapp mt-5">You have {countUserCreatedRoom} created room</h2>)}

<h1 className="text-warning fw-semibold font-family-codeapp mt-5">Your Joined Rooms Count</h1>
       {(countUserJoinedRoom > 1 ? <h2 className="text-white fw-semibold font-family-codeapp mt-5">You have {countUserJoinedRoom} joined rooms</h2> :
       <h2 className="text-white fw-semibold font-family-codeapp mt-5">You have {countUserJoinedRoom} joined room</h2>)}
    
    <div>
    <h1 className="text-warning fw-semibold font-family-codeapp">Recent Created Rooms:</h1>
      <div className={`mt-5 ${route.rooms_card}`}>
      {recentRoom}
      </div>
      <h1 className="text-warning fw-semibold font-family-codeapp">Recent Joined Rooms: </h1>
    <div className={`mt-5 ${route.rooms_card}`}>
      {recentJoinedRoom}
      </div> 
    </div>
    </div>
  )
})

