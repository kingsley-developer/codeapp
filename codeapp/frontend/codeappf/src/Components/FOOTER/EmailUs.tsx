"use client";
import {memo, useState} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useRef} from "react"
import emailjs from "@emailjs/browser"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { Fade } from "react-awesome-reveal"
import { useAlert } from 'react-alert';

const schema = yup.object({
    email: yup.string().email("Email must be a valid email").required("Please provide an email address"),
    message: yup.string().required("Please provide the message")
}).required()

export default memo(function EmailUs() {

    const alert_msg = useAlert()

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
                alert_msg.success("Email sent")
            },
            (error: Error)=>{
                setLoading(false)
                alert_msg.error("error " + String(error.message))
            }
        )
    }

  return (
    <Fade cascade={true} damping={5} direction="down">
    <div className="container-fluid mt-5">
        <h2 className="text-dark text-center fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp">Contact Us</h2>
        <div>
            <Form ref={form} onSubmit={handleSubmit(sendEmail)}>
                <Form.Group className="mt-3" controlId="formgroupid">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Email:</Form.Label>
                    <Form.Control autoComplete="off" type="email" {...register("email")} placeholder="name@gmail.com" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.email?.message}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid1">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Message:</Form.Label>
                    <Form.Control autoComplete="off" as="textarea" rows={6} className='mw-100 mt-2' {...register("message")}/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.message?.message}</p>
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
    </Fade>
  )
})