"use client"
import {memo, useEffect, useState} from 'react'
import route from "../../../../assets/User/routes/Rooms.module.scss"
import axios from "axios"
import { ColorRing } from "react-loader-spinner"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {Fade} from "react-awesome-reveal"
import Popup from "reactjs-popup"
import {ReactSearchAutocomplete} from "react-search-autocomplete"
import JoinRoomPreview from './AllRoomRoutes/JoinRoomPreview'

export default memo(function Rooms() {
  const [join, setJoin] = useState(false)
  const closeJoinModal = () => setJoin(false)
  const [loading, setLoading] = useState(false)
  const [auth_Msg, setAM] = useState("")
  const [err_Msg, setE] = useState("")
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
  const [show, setShow] = useState(false)

  const [items, setItems] = useState([])

  function onS(item:any){

    console.log(item)

  }
  async function onSe(text:string, result:any){
    try{
      if (getAccessToken && user_id) {
      const fetching = await axios.get(`http://localhost:8999/get_all_rooms_on_search/?room_name_search=${text}`)
      const data:AllRoomsData = fetching.data
      console.log(`ResultLet see: ${text}`)
      console.log(data)
      if(data.check){
        setRoom(data.data)
      }
      }
    }
    catch(e:any){
      console.log(e)
    }
  }

  async function clear(){
    try{
      if (getAccessToken && user_id) {
      const fetching = await axios.get(`http://localhost:8999/get_all_rooms_on_search/get_all_rooms`)
      const data:AllRoomsData = fetching.data
      console.log(data)
      if(data.check){
        setRoom(data.data)
      }
      }
    }
    catch(e:any){
      console.log(e)
    }
  }
  function onH(result:any){
    console.log(result)
  }

  const formatResult = (item:any)=>{
    return (
      <>
      <span style={{display: "block", textAlign:"left"}}>
        id: {item.id}
      </span>
      <span style={{display: "block", textAlign:"left"}}>
        name: {item.name}
      </span>
      </>
    )
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
        <Card.Footer>
          Room Total users: {data.room_total_usr}
        </Card.Footer>
        <Button  onClick={() => setJoin(o => !o)}  variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>Join Room</Button>
      </Card>
      </Fade>
      <Popup
     open={join}
     closeOnDocumentClick
      onClose={closeJoinModal}
      position={"center center"}
      modal={true}
      >     
      <JoinRoomPreview close={closeJoinModal} privacy={data.room_visibility}/>
      </Popup>
      </div>
    )
  })

  const showMessage =()=>{
    if(!show){
      return <h2 className="text-white lh-base fw-semibold font-family-codeapp">Empty Rooms</h2>
    }
  }

  useEffect(() => {
   
    async function getAllRooms() {
      try{
        if (getAccessToken && user_id) {
        setAM("")
        setLoading(true)
        const fetching = await axios.get("http://localhost:8999/get_all_rooms")
        const data:AllRoomsData = fetching.data
        if(data.check){
          setLoading(false)
          setShow(true)
          setRoom(data.data)
          
          data.data.map((data2:SearchData, index:number)=>{
            setItems((d)=>{
              return [
                ...d,
                {
                  id:data2.created_room_id,
                  name: data2.room_name
                }
              ]
            })
          })

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

        setLoading(false)
        setShow(false)
        setAM("")
        setE(String(e))
      }
    }
  
    getAllRooms()
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
  return (
    <div className={`container`}>
      <h2 className="text-white fs-3 lh-base font-family-codeapp mt-5">Search For Rooms 🕵️‍♀️ </h2>
      <ReactSearchAutocomplete
      items={items}
      onSelect={onS}
      onHover={onH}
      onSearch={onSe}
      onClear={clear}
      formatResult={formatResult}
      className={"mt-5"}
      />
      <div className={`mt-5 ${route.rooms_card}`}>
        {show && roomsSetup}
      </div>

      {(showMessage() == undefined ? "" : showMessage())}
      {(err_Msg == "" ? "" : <h2 className="text-white lh-base fw-semibold font-family-codeapp">{err_Msg}</h2>)}
      {(auth_Msg == "" ? "" : <h2 className="text-white lh-base fw-semibold font-family-codeapp">{auth_Msg}</h2>)}
    </div>
  )
})

