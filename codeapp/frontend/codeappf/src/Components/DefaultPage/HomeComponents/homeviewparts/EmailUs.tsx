"use client";
import {memo} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useRef} from "react"
import emailjs from "@emailjs/browser"
import "../../../../assets/default-pgs-styles/homestyles/footer_homeview_child/Emailus.scss"

export default memo(function EmailUs() {
    const form = useRef("")

    const sendEmail = async(e: any)=>{
        e.preventDefault()

        emailjs.sendForm("serviceID", "templateID", form.current, {
            publicKey: "publickey",
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
    <div>
        <h2 className="text-dark text-center fs-4 fw-semibold badge rounded-pill bg-warning mt-3">Contact Us</h2>
        <div>
            <Form ref={form}>
                <Form.Group className="mt-3" controlId="formgroupid">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Email:</Form.Label>
                    <Form.Control type="email" placeholder="name@gmail.com" className='mw-100' name="user_email"/>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid1">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Message:</Form.Label>
                    <Form.Control as="textarea" rows={4} className='mw-100' name="message"/>
                </Form.Group>

                <Button variant="warning" type="submit" className='mt-4 fw-semibold mb-4' value="Send" onClick={sendEmail}>Submit</Button>
            </Form>
        </div>
    </div>
  )
})