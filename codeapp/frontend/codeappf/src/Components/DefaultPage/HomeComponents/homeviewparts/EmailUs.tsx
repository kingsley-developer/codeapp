"use client";
import {memo, useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useRef, useState} from "react"
import emailjs from "@emailjs/browser"
import axios from "axios"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

async function getEmailKeys(){
    const keys = await axios.get("http://localhost:8670/emailjs_keys")
    return keys.data
}

const schema = yup.object({
    email: yup.string().required("Please provide an email address"),
    message: yup.string().required("Please provide the message")
}).required()

export default memo(function EmailUs() {
    const [emailjs_key, set_emailjs_key] = useState({
        Publickey: "",
        ServiceID: "",
        TemplateID: ""
    })

    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(()=>{
     async function emailKeys(){
       const data = await getEmailKeys()
       set_emailjs_key(data)
     }
     emailKeys()
    }, [])
    const form = useRef("")

    const sendEmail = async(data: any)=>{

        console.log(data)

        emailjs.sendForm(emailjs_key.ServiceID, emailjs_key.TemplateID, form.current, {
            publicKey: emailjs_key.Publickey,
        })
        .then(
            ()=>{
                console.log("Success!")
                alert("Email Sent")
            },
            (error: Error)=>{
                console.log("Failed to send email....", error.message)
                alert(error.message)
            }
        )
    }

  return (
    <div className="container-fluid">
        <h2 className="text-dark text-center fs-4 fw-semibold badge rounded-pill bg-warning mt-3">Contact Us</h2>
        <div>
            <Form ref={form} onSubmit={handleSubmit(sendEmail)}>
                <Form.Group className="mt-3" controlId="formgroupid">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Email:</Form.Label>
                    <Form.Control type="email" {...register("email")} placeholder="name@gmail.com" className='mw-100'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.email?.message}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid1">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Message:</Form.Label>
                    <Form.Control as="textarea" rows={4} className='mw-100' {...register("message")}/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.message?.message}</p>
                </Form.Group>

                <Button variant="warning" type="submit" className='mt-4 fw-bold mb-4 w-75 fs-4' value="Send">Submit</Button>
            </Form>
        </div>
    </div>
  )
})