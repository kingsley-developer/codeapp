"use client";
import {memo, useState} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useRef} from "react"
import emailjs from "@emailjs/browser"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = yup.object({
    email: yup.string().email("Email must be a valid email").required("Please provide an email address"),
    message: yup.string().required("Please provide the message")
}).required()

export default memo(function EmailUs() {

    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema),
    })

    const form = useRef("")

    const sendEmail = async(data: any)=>{

        setLoading(true)
        emailjs.sendForm(import.meta.env.VITE_serviceID, import.meta.env.VITE_TemplateID, form.current, {
            publicKey: import.meta.env.VITE_Publickey,
        })
        .then(
            ()=>{
                setLoading(false)
                alert("Email Sent")
            },
            (error: Error)=>{
                alert(error.message)
                setLoading(false)
            }
        )
    }

  return (
    <div className="container-fluid mt-3">
        <h2 className="text-dark text-center fs-4 fw-semibold badge rounded-pill bg-warning">Contact Us</h2>
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

                <Button
                variant="warning" 
                type="submit" 
                className='mt-4 fw-bold mb-4 w-75 fs-4'
                active 
                value="Send">{loading ? <span>Submitting</span> : <span>Submit</span>}</Button>
            </Form>
        </div>
    </div>
  )
})