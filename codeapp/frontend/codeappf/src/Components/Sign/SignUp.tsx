"use client"
import { memo, useState, useEffect } from 'react'
import signup_scss from "../../assets/Sign/SignUp.module.scss"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import {  useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useAlert } from 'react-alert';
import {useNavigate} from "react-router-dom"
import {useAppDis, useAppSel} from "../../codeapp-redux-store/Typed-hooks/hooks"
import {signup} from "../../codeapp-redux-store/userprofile/user_profile"
import axios from "axios"

const schema = yup.object({
    firstname: yup.string().required("Please provide your firstname"),
    lastname: yup.string().required("Please provide your lastname"),
    username: yup.string().required("Please provide your username"),
    password: yup.string().required("Please provide your password"),
    re_password: yup.string().required("Please provide your re-enter password"),
    email: yup.string().email("Email must be a valid email").required("Please provide an email address"),
}).required()

export default memo(function SignUp() {
  const user: userType = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  }

  const alert_msg = useAlert()
  const toDashboard = useNavigate()
  const dispatch = useAppDis()
  const [loading, setLoading] = useState(false)
  const submitUser = useAppSel(state => state.userdata)
  const toServer: userType = submitUser

  const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
  })

  const submitData = async (data: any) => {
    if (data["password"] == data["re_password"]) {
        user.firstname = data["firstname"]
        user.lastname = data["lastname"]
        user.username = data["username"]
        user.email = data["email"]
        user.password = data["password"]

        dispatch(signup(user))
        setLoading(true)
    }
    else{
      alert("Password those not match")
      setLoading(false)
    }
  }

  useEffect(() => {
    async function submitNewUser() {
      try{
       if (loading) {
        const result = await axios.post("http://localhost:8999/create_user", {
           data: JSON.stringify({
            firstname: toServer.firstname,
            lastname: toServer.lastname,
            username: toServer.username,
            email: toServer.email,
            password: toServer.password,
          })
        })


          const checked: get_user_signup = await result.data
          if (checked.check) {
            alert_msg.success(checked.msg)

            const getNewUser = await axios.get(`http://localhost:8999/get_user_info/?username=${toServer.username}&password=${toServer.password}&type=signup`)
            const data: signData = await getNewUser.data

          if (data.check) {
            alert_msg.success(data.msg)

            const signup_msg = `
            Thank you for signing up  to codeapp.com user: ${data.data[0].user_name}
            `
            const signin_msg = `
            Thank you for signing in  to codeapp.com user: ${data.data[0].user_name}
            `

            const result2 = await axios.post("http://localhost:8999/add_msgs", {
              data: JSON.stringify({
                id:data.data[0].user_id,
                msg_name: "Sign Up Message",
                msg_des:signup_msg
             })
           })
           const res:AddMsgType = await result2.data
           if(res.check){
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
          toDashboard(`/dashboard/${data.data[0].user_id}`, {state:{type: "signup", exist:true}})
          setLoading(false)
         }
           }
        
           else{
            setLoading(false)
           }
          }
          else{
            alert_msg.error(data.msg)
            setLoading(false)
          }
        }
        else {
          alert_msg.error(checked.msg) 
          setLoading(false)
        }  
        }
      }
      catch(e:any){
          alert_msg.error(String(e)) 
          setLoading(false)
      }
              
    }
    submitNewUser()
    }, [loading])

  return (
    <div>
    <div className={`bg-dark text-warning text-center container ${signup_scss.signup_popup_scroll}`}>
        <h2 className="text-dark fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp mt-1 w-50">Sign Up</h2>
          <Form onSubmit={handleSubmit(submitData)}>

          <Form.Group className="mt-5" controlId="formgroupid1">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Firstname:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("firstname")} placeholder="firstname" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.firstname?.message}</p>
          </Form.Group>
          <Form.Group className="mt-3" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Lastname:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("lastname")} placeholder="lastname" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.lastname?.message}</p>
                </Form.Group>
                <Form.Group className="mt-3" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Username:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("username")} placeholder="username" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.username?.message}</p>
                </Form.Group>
                <Form.Group className="mt-3" controlId="formgroupid3">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Password:</Form.Label>
                    <Form.Control autoComplete="off" type="password" {...register("password")} placeholder="foot123" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.password?.message}</p>
          </Form.Group>
          <Form.Group className="mt-3" controlId="formgroupid4">
          <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Re-Enter Password:</Form.Label>
                    <Form.Control autoComplete="off" type="password" {...register("re_password")} placeholder="foot123" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.re_password?.message}</p>
                </Form.Group>
                <Form.Group className="mt-3" controlId="formgroupid5">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Email:</Form.Label>
                    <Form.Control autoComplete="off" type="email" {...register("email")} placeholder="name@gmail.com" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.email?.message}</p>
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

