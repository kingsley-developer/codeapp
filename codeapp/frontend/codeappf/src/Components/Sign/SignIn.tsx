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
  const [check, setCheck] = useState(false)
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
    setCheck(true)   
}

  useEffect(() => {
    async function getExistUser() {
      try{
      if(check){
        const getExistUser = await axios.get(`http://localhost:8999/get_user_info2/?username=${loginUser.username}&password=${loginUser.password}`)
        const data = await getExistUser.data

        console.log(data, {length: data.data.length}, {d: data.data})

          if (data.data.length > 0) {
            alert_msg.success(`Successfully signed in ${loginUser.username}`)
            setCheck(false)
            toDashboard("/dashboard", {state:{userdata: data}})
            setLoading(false)
          }
          else {
            alert_msg.error("No user found")
            alert_msg.success(data.msg2)
            setCheck(false)
            setLoading(false)
          }
        }
      }
      catch (err: any) {
        alert_msg.error(String(err))
        setCheck(false)
        
        }
    }
    getExistUser()
  }, [check])

  return (
    <div>
    <div className={`bg-dark text-warning text-center container ${signin_scss.signup_popup_scroll}`}>
        <h2 className="text-dark fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp mt-1 w-50">Sign In</h2>
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

