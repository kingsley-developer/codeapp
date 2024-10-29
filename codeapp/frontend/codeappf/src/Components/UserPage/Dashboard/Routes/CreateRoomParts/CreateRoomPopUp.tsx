"use client"
import React, {memo, useEffect, useState} from 'react'
import route from "../../../../../assets/User/routes/CreateRoom/CreateRoomPopUp.module.scss"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import {  useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useAlert } from 'react-alert';
import axios from "axios"
import { useAppSel, useAppDis } from '../../../../../codeapp-redux-store/Typed-hooks/hooks';
import { create_room } from '../../../../../codeapp-redux-store/userprofile/user_profile'
import Socket from "../../../../../ClientSocket"

const schema = yup.object({
    roomname: yup.string().required("Please enter Room Name"),
    room_des: yup.string().required("Please provide your room description"),
    room_tag: yup.string().required("Please provide your room tag"),
    room_visible: yup.boolean().required("Please provide your room visiblity"),
    rooms_created_total_users: yup.number(),
}).required()

type propstype = {
  close: ()=>void,
  fresh: React.Dispatch<React.SetStateAction<boolean>>
}
export default memo(function CreateRoomPopUp({close, fresh}:propstype) {
 const {register, handleSubmit, watch, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
 })


  const room =
    {
    roomname: "",
    room_des: "",
    room_tag: "",
    room_visible: false,
    rooms_created_total_users: 0
    }

  const dispatch = useAppDis()
  const alert_msg = useAlert()
  const userDetails = useAppSel(state => state.userdata)
  const userRoomDetails: userRoomDetails = userDetails
  const [loading, setLoading] = useState(false)
  const user_id = localStorage.getItem("user_id")
  const id = Number(user_id)
  const getAccessToken = localStorage.getItem("accessToken")

  const submitData = async (data: any) => { 
      
    room.roomname = watch("roomname")
    room.room_des = watch("room_des")
    room.room_tag = watch("room_tag")
    room.room_visible = watch("room_visible")
    room.rooms_created_total_users = Number(watch("rooms_created_total_users"))
    dispatch(create_room(room))
    setLoading(true)
  }

  async function NewRoom(){
    try {
       if(id && getAccessToken){
        const result = await axios.post("http://localhost:8999/create_room", {
           data: JSON.stringify({
            usr_id: id,
            roomname: userRoomDetails.roomname,
            roomdes: userRoomDetails.room_des,
            roomtag: userRoomDetails.room_tag,
            roomvis: userRoomDetails.room_visible,
            roomtotal_usr: userRoomDetails.rooms_created_total_users
          })
        })
        
         const data:createRoomType = await result.data
         
         if (data.check) {
           alert_msg.success(data.msg)
           const Create_Room_msg = `
           Hello you just created a room name: ${userRoomDetails.roomname}.
           Go to Created Room page to see your newly created room.
           Your regards Codeapp.com
           `
           const result2 = await axios.post("http://localhost:8999/add_msgs", {
            data: JSON.stringify({
              id:id,
              msg_name: "Create Room Message",
              msg_des:Create_Room_msg
           })
          }
        )
        const res:AddMsgType = result2.data
        if(res){
          setLoading(false)
          Socket.emit("create_room",userRoomDetails.roomname)
          close()
          fresh(true)
        }
          else{
          setLoading(false)
          close()
          fresh(true)
           }
         }
         else {
           alert_msg.error(data.msg)
           setLoading(false)
           close()
           fresh(true)
         }
       }   
      }
      catch(e:any){
          alert_msg.error(String(e)) 
          setLoading(false)
      close()
      fresh(true)
      }
  }
      

  useEffect(() => {
   
    async function addRoom() {
      try {

      if (loading) {
        const getAllRN = await axios.get(`http://localhost:8999/get_all_room_name`)
        const data: validateRoomType = await getAllRN.data
        if (data.check) {
          const a = data.data
          for (let i = 0; i < a.length; i++){
            if (a[i].room_name == room.roomname) {
              alert_msg.error(`Sorry room already exist: ${room.roomname}`)
              setLoading(false)
              return
            }
            else{  
              await NewRoom()
              return
            }
          }
        }
          else{
            await NewRoom()
          }
        }
      }
      catch (e: any) {
        setLoading(false)
        alert_msg.error(String(e))
      }
    }
    addRoom()
    }, [loading])



  return (
    <div className={`bg-dark text-warning text-center container ${route.create_popup_scroll}`}>
        <h2 className="text-dark fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp mt-1 w-50">Create New Room</h2>
    <Form onSubmit={handleSubmit(submitData)}>

          <Form.Group className="mt-5" controlId="formgroupid1">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Room Name:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("roomname")} placeholder="roomname" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.roomname?.message}</p>
          </Form.Group>
                <Form.Group className="mt-3" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Room Description:</Form.Label>
                    <Form.Control autoComplete="off" {...register("room_des")} placeholder="This is a python programming chat room" className='mw-100 mt-2' as="textarea" rows={6}/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.room_des?.message}</p>
                </Form.Group>
                <Form.Group className="mt-3" controlId="formgroupid3">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Room Tag:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("room_tag")} placeholder="foot123" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.room_tag?.message}</p>
          </Form.Group>
          <Form.Group className="mt-3" controlId="formgroupid4">
          <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Off For Public Or On For Private Room:</Form.Label>
                    <Form.Check autoComplete="off" type="checkbox" {...register("room_visible")} className='mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.room_visible?.message}</p>
        </Form.Group>
          <Form.Group className="mt-3" controlId="formgroupid4">
          <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Total Users For The Room:</Form.Label>
                    <Form.Control autoComplete="off" type="number" {...register("rooms_created_total_users")} className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.rooms_created_total_users?.message}</p>
            </Form.Group>
                <Button
                variant="warning" 
                type="submit" 
                className='mt-4 fw-bold mb-4 w-75 fs-4 font-family-codeapp'
                active={loading ? false : true}
                disabled={loading ? true : false}
          value="Send">{loading ? <span>Submitting</span> : <span>Submit</span>}</Button>
      </Form>
    </div>
  )
})

