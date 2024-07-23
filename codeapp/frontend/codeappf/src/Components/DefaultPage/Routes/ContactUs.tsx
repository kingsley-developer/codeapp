"use client";
import "../../declarefiles/declaremodules.d.ts"
import {memo, useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useRef} from "react"
import emailjs from "@emailjs/browser"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useAlert } from 'react-alert';
import contact_scss from "../../../assets/default-pgs-styles/contact-styles/ContactUs.module.scss"
import contact_img1 from "../../../assets/contactus-imgs/young-business-women-having-casual-meeting-at-coffee-shop-austockphoto-000083275.jpg"
import { Fade } from "react-awesome-reveal"
import ScrollUpButton from "react-scroll-up-button"

const schema = yup.object({
    email: yup.string().email("Email must be a valid email").required("Please provide an email address"),
    message: yup.string().required("Please provide the message")
}).required()


export default memo(function ContactUs() {
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
        <div>
            <ScrollUpButton
          style={{backgroundColor: "gold", width:75}}
        />
        <div className={`container-fluid ${contact_scss.contContactUsMain} bg-dark`}>
            <div className={"container text-white"}>

                <Fade cascade={true} damping={5} direction="down">
                <p className={"text-center fw-semibold font-family-codeapp fs-4"}>
                    Get in touch with our team of expert developers to discuss your project requirements, report any issues or bugs,
                    or simply to share your feedback and suggestions on how we can improve our chat app.
                    Whether you're looking to integrate our chat functionality into your existing application, need assistance with
                    customization or scaling, or have questions about our API or SDK, we're here to help.
                </p>
                </Fade>

            <Fade cascade={true} damping={5} direction="down">
            <img src={contact_img1}
              alt=""
              className={`${contact_scss.contactImgsstyles}  mt-5`} />
            </Fade>
                

                <Fade cascade={true} damping={5} direction="down">
                <p className={"text-center fw-semibold font-family-codeapp fs-4 mt-5"}>
                    Our dedicated support team is committed to providing top-notch assistance and ensuring a seamless development
                    experience. Dont hesitate to reach out to us via email, phone, or by filling out the contact form below. We
                    look forward to hearing from you and exploring ways to collaborate and drive innovation in the world of chat apps
                    and real-time communication!.
                </p>
                </Fade>
            </div>

            <Fade cascade={true} damping={5} direction="down">
            <span className={`${contact_scss.downhandstyle_contact_us}`}>👇</span>    
            </Fade>
            
            <Fade cascade={true} damping={5} direction="down">
            <div className={`container mt-5`}>
        <h1 className={`text-dark text-center
         fw-bold bg-warning font-family-codeapp ${contact_scss.center_contactus_head} badge rounded-pill fs-4`}>
         Contact Us
         </h1>
        <div>
            <Form ref={form} onSubmit={handleSubmit(sendEmail)}>
                <Form.Group className="mt-5" controlId="formgroupid">
                    <Form.Label className={`text-white ${contact_scss.centerText} fs-3 fw-bold font-family-codeapp`}>Enter Email:</Form.Label>
                    <Form.Control type="email" {...register("email")} placeholder="name@gmail.com" className='mw-100 mt-4'/>
                    <p className='text-danger text-center fs-4 lh-base mt-4 fw-semibold font-family-codeapp'>{errors.email?.message}</p>
                </Form.Group>

                <Form.Group className="mt-5" controlId="formgroupid1">
                    <Form.Label className={`text-white ${contact_scss.centerText} fs-3 fw-bold font-family-codeapp`}>Enter Message:</Form.Label>
                    <Form.Control as="textarea" rows={10} className='mw-100 mt-4' {...register("message")}/>
                    <p className='text-danger text-center fs-4 lh-base mt-4 fw-semibold font-family-codeapp'>{errors.message?.message}</p>
                </Form.Group>

                <Button
                variant="warning" 
                type="submit" 
                className={`fw-bold mt-5 w-25 fs-4 font-family-codeapp ${contact_scss.centerBtn}`}
                active 
                value="Send">{loading ? <span className='text-center'>Submitting</span> : <span className="text-center">Submit</span>}</Button>
            </Form>
          </div>
    </div>
        </Fade>
    </div>    
    </div>
  )
})
  