"use client"
import {memo, useEffect, useState, useCallback} from 'react'
import route from "../../../../assets/User/routes/Rooms.module.scss"
import axios from "axios"
import { ColorRing } from "react-loader-spinner"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {Fade} from "react-awesome-reveal"
import {ReactSearchAutocomplete} from "react-search-autocomplete"
import { useAlert } from 'react-alert';
import Socket from "../../../../ClientSocket"

export default memo(function Rooms() {
  const [loading, setLoading] = useState(false)
  const [auth_Msg, setAM] = useState("")
  const [err_Msg, setE] = useState("")
  const alert_msg = useAlert()
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

  const [items, setItems] = useState([
    {

    }
  ])

  const searchStyle = {
    fontSize:"15px"
  }

  const onS = useCallback(async (item:any)=>{
    try{
      if (getAccessToken && user_id) {
      const fetching = await axios.get(`http://localhost:8999/get_all_rooms_on_select/?room_name=${item.name}`)
      const data:AllRoomsData = fetching.data
      if(data.check){
        setRoom(data.data)
      }
      }
    }
    catch(e:any){
      setRoom([])
    }
  }, [])

  const onH = useCallback(async (item:any)=>{
    try{
      if (getAccessToken && user_id) {
      const fetching = await axios.get(`http://localhost:8999/get_all_rooms_on_select/?room_name=${item.name}`)
      const data:AllRoomsData = fetching.data
      if(data.check){
        setRoom(data.data)
      }
      }
    }
    catch(e:any){
      setRoom([])
    }
  }, [])


  const onSe = useCallback(async (text:string, result:any)=>{
    try{
      if (getAccessToken && user_id) {
      if(text.length == 0){
        return
      }
      const fetching = await axios.get(`http://localhost:8999/get_all_rooms_on_search/?room_name_search=${text}`)
      const data:AllRoomsData = fetching.data
      if(data.check){
        setRoom(data.data)
      }
      }
    }
    catch(e:any){
      setRoom([])
    }
  }, [])

  async function clear(){
    try{
      if (getAccessToken && user_id) {
      const fetching = await axios.get(`http://localhost:8999/get_all_rooms`)
      const data:AllRoomsData = fetching.data
      if(data.check){
        setRoom(data.data)
      }
      }
    }
    catch(e:any){
      setRoom([])
    }
  }

  async function getData(data:JoinRoomData){
    try{
      if(getAccessToken && user_id){
        const result15 = await axios.get(`http://localhost:8999/validate_joined_checkowner/?user_id=${user_id}&room_id=${data.created_room_id}`)
          const data15 = await result15.data
          if(data15.check == false){
            if(data.room_visibility){
              const result1 = await axios.get(`http://localhost:8999/validate_joined_rooms2/?user_id=${user_id}&room_name=${data.room_name}`)
              const data3 = await result1.data
              if(data3.check == false){
                const result = await axios.post("http://localhost:8999/join_room", {
                  data: JSON.stringify({
                    createdRoom_id: data.created_room_id,
                    usr_id:user_id,
                    roomname:data.room_name,
                    roomdes:data.room_des,
                    roomtag:data.room_tag,
                    roomvis:data.room_visibility
                 })
               })
               const data2 = await result.data
             
               if(data2.check){
              alert_msg.success(data2.msg)
              Socket.emit("join_room",data.room_name)
              const Join_Room_msg = `
               Hello you just joined a room : ${data.room_name}.
               Go to Joined Room page to see your newly joined room.
               Your regards Codeapp.com`
               const result2 = await axios.post("http://localhost:8999/add_msgs", {
                data: JSON.stringify({
                  id:user_id,
                  msg_name: "Join Room Message",
                  msg_des:Join_Room_msg
               })
              })
              const res:AddMsgType = result2.data
            if(res.check){
              console.log(res)
            }
             }
              }
              else{
                alert_msg.error("You have already joined this room")
               }
            }
          } 
          else{
            alert_msg.error("Your the owner of this room")
          }
      }
    }
    catch(err:any){
      alert_msg.error(String(err))
    }
  }
  

  const formatResult = (item:any)=>{
    return (
      <>
      <span style={{display: "block", textAlign:"left", color:"red"}}>
        id: {item.id}
      </span>
      <span style={{display: "block", textAlign:"left", color:"green"}}>
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
        <Button  onClick={() =>{
          getData(data)
        } }  variant="warning" className={`mb-4 w-50 text-center fw-bold ${route.create_btn}`}>Join Room</Button>
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
   
    async function getAllRooms() {
      try{
        if (getAccessToken && user_id) {
        setAM("")
        setE("")
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
      setRoom([])
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
      className={`mt-5 ${route.rooms_search_box}`}
      styling={searchStyle}
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

