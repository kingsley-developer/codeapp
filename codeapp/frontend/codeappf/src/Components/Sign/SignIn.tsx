"use client"
import { memo, useState, useEffect } from 'react'
import signin_scss from "../../assets/Sign/SignIn.module.scss"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useAlert } from 'react-alert';
import {useNavigate} from "react-router-dom"
import axios from "axios"

const schema = yup.object({
    username: yup.string().required("Please provide your username"),
    password: yup.string().required("Please provide your password"),
}).required()

export default memo(function SignIn() {
  const alert_msg = useAlert()
  const toDashboard = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginUser, setLoginUser] = useState({
    username:"",
    password: ""
  })

  const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
  })

  const submitData = async (data: any) => {
    setLoginUser(prev => {
      return {
        ...prev,
        username: data["username"],
        password: data["password"]
      }
    })
    setLoading(true)
}

  useEffect(() => {
    async function getExistUser() {
      try {
       if(loading){
        const getExistUser = await axios.get(`http://localhost:8999/get_user_info/?username=${loginUser.username}&password=${loginUser.password}&type=none`)
        const data: signData = await getExistUser.data

          if (data.check) {
            alert_msg.success(data.msg)
            const signin_msg = `
            Thank you for signing in  to codeapp.com user: ${data.data[0].user_name}
            `
            const result3 = await axios.post("http://localhost:8999/add_msgs", {
              data: JSON.stringify({
                id:data.data[0].user_id,
                msg_name: "Sign In Message",
                msg_des:signin_msg
             })
           })
           const res2:AddMsgType = await result3.data
           if(res2.check){
            localStorage.setItem("accessToken", data.accesstoken)
            localStorage.setItem("user_id", String(data.data[0].user_id))
            toDashboard(`/dashboard/${data.data[0].user_id}`, {state:{exist:true}})
            setLoading(false)
           }
            
          }
          else{
            alert_msg.error(data.msg)
            setLoading(false)
          }
        } 
      }
      catch (e: any) {
        alert_msg.error(String(e))
        setLoading(false)
      }
    }
    getExistUser()
  }, [loading])

  return (
    <div>
    <div className={`bg-dark text-warning text-center container ${signin_scss.signup_popup_scroll}`}>
        <h2 className="text-dark fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp mt-5 w-50">Sign In</h2>
          <Form onSubmit={handleSubmit(submitData)}>
                <Form.Group className="mt-5" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Username:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("username")} placeholder="username" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.username?.message}</p>
                </Form.Group>
                <Form.Group className="mt-3" controlId="formgroupid3">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Password:</Form.Label>
                    <Form.Control autoComplete="off" type="password" {...register("password")} placeholder="foot123" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.password?.message}</p>
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
    </div>
  )
})

