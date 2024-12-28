import React, {memo, useState, useEffect} from 'react'
import route from "../../../../../assets/User/routes/allroomroutes/JoinRoomPage.module.scss"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Socket from '../../../../../ClientSocket'
import axios from "axios"

export default memo(function JoinRoomPage() {
    const room_id = localStorage.getItem("roomId")
    const user_id = localStorage.getItem("user_id")
    const getAccessToken = localStorage.getItem("accessToken")
    const room_name = localStorage.getItem("room_name")
    const [text, setText] = useState("")
    const [make, setMake] = useState(false)
    const [msgData, setMsgData] = useState([{
        room_msg_id:0,
        msg:"",
        typeofmmsg:""
    }]) 

    const msg_setup = msgData.map((data, index)=>{
        console.log(data, " trying to see something")
        return (
            <div key={data.room_msg_id} className={`text-white fs-3 text-center`}>
                <p>{data.typeofmmsg}</p>
                {(data.typeofmmsg == "sender" ? <p className={route.chat_align}>{data.msg}</p> : <p className={route.chat_align2}>{data.msg}</p>)}
            </div>
        )
    })

    function watchText(e:React.ChangeEvent){
        const value = e.target.value
        const textvalue: string = String(value)
        if(textvalue.length > 500){
            return
        }
        else{
            setText(textvalue)
        }
    }

    async function submit(){
            try{
                if(user_id && getAccessToken){
                Socket.emit("sender_msg", text, room_name)
                const result = await axios.post("http://localhost:8999/insert_room_msg", {
                    data: JSON.stringify({
                        usr_id:user_id,
                        created_room_id:room_id,
                        msg:text,
                        typeofmmsg2:"sender"
                   })
                 })
        
                const data2 = await result.data
                if(data2.check){
                    const result4 = await axios.get(`http://localhost:8999/get_room_msgs/?created_room_id=${room_id}`)
                    const data5 = await result4.data
                
                if(data5.check){
                    setMsgData(data5.data)
                    setMake(true)
                }
                else{
                    setMake(false)
                }
            }
                else{
                    setMake(false)
                }
            }            
            }
            catch(e:any){
                setMake(false)
            }
                
    }

    useEffect(()=>{
        async function getRoomMsgs(){
            try{
                if(user_id && getAccessToken){
            if(make){
                Socket.on("receiver_msg", async(data:string)=>{        
                    const result2 = await axios.post("http://localhost:8999/insert_room_msg", {
                        data: JSON.stringify({
                            usr_id:user_id,
                            created_room_id:room_id,
                            msg:data,
                            typeofmmsg2:"receiver"
                       })
                     })
                     
                     const data3 = await result2.data
                     if(data3.check){
                     const result3 = await axios.get(`http://localhost:8999/get_room_msgs/?created_room_id=${room_id}`)
                     const data4 = await  result3.data
                     console.log(data4, " useeffect receive messages check")
                     if(data4.check){
                        setMsgData(data4.data)
                     }
                     }
                })
            }
            else{
                const result4 = await axios.get(`http://localhost:8999/get_room_msgs/?created_room_id=${room_id}`)
                const data5 = await  result4.data
                console.log(data5, " useeffect else messages check")
                if(data5.check){
                    setMsgData(data5.data)
                }
            }
            }
        }
            catch(e:any){
                console.log(e)
            }
        }
        getRoomMsgs()
    },[make])
   
    return (
    <div className={`fs-4 text-white container`}>
        <div>
            <div className={`${route.chat_con} text-wrap text-break`}>
            <h1 className={`fs-4 text-white`}>JoinRoomPage {room_id} {room_name}</h1>
            <div className={`${route.chat_con2} text-wrap text-break`}>
            {msg_setup}
            </div>
      
            <div className={route.text_area_join}>
        <Form>
                <Form.Group className="mt-3" controlId="formgroupid1">
                    <Form.Control autoComplete="off" as="textarea" rows={4} className='mw-100 mt-2' onChange={watchText}/>
                </Form.Group>
            </Form>
        <Button 
        variant="warning" 
        onClick={submit} 
        className={`mb-4 w-50 text-center fw-bold ${route.send_btn}`}    
        >Send</Button>
        </div> 
            </div>
            
        </div> 
    </div>
  )
})