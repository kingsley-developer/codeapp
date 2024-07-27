"use client"
import { memo, useState } from 'react'
import signup_scss from "../../assets/Sign/SignUp.module.scss"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useAlert } from 'react-alert';
import {useNavigate} from "react-router-dom"
import {useAppSel, useAppDis} from "../../codeapp-redux-store/Typed-hooks/hooks"
import {signup} from "../../codeapp-redux-store/userprofile/user_profile"

const schema = yup.object({
    firstname: yup.string().required("Please provide your firstname"),
    lastname: yup.string().required("Please provide your lastname"),
    password: yup.string().required("Please provide your password"),
    re_password: yup.string().required("Please provide your re-enter password"),
    email: yup.string().email("Email must be a valid email").required("Please provide an email address"),
}).required()

type userType = {
    firstname?: string,
    lastname?: string,
    email?: string
    password?: string
    rooms_created?: string[]
    rooms_created_total_users?: number[]
    roomsjoined?: string[]
}
export default memo(function SignUp() {
  const alert_msg = useAlert()
  const toSetUpProfile = useNavigate()
  const user_profile = useAppSel((state) => state.userdata.user)
  const dispatch = useAppDis()
  const [loading, setLoading] = useState(false)

  const {register, handleSubmit, watch, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
  })

  const submitData = async (data: any) => {
    if(watch("password") == watch("re_password")){
      const d: userType = {
        firstname: data["firstname"],
        lastname: data["firstname"],
        email: data["email"],
        password: data["password"],
        rooms_created: [""],
        rooms_created_total_users: [0],
        roomsjoined: [""]
      }
    
      dispatch(signup(d))
      console.log(user_profile)
      setLoading(false)
      alert_msg.success("Successfully signed up")
      toSetUpProfile("/setup_profile")
    }
    else{
      alert("Password those not match")
      setLoading(false)
    }
  }

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
                active 
                value="Send">{loading ? <span>Submitting</span> : <span>Submit</span>}</Button>
            </Form>
        </div>
    </div>
  )
})

