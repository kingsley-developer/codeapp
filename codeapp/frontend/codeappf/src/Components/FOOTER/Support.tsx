"use client";
import {memo, useState} from 'react'
import "../../@types/import.d.ts"
import PaystackPop from '@paystack/inline-js'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import { Fade } from "react-awesome-reveal"
import { useAlert } from 'react-alert';

const schema = yup.object({
  firstname: yup.string().required("Please provide your firstname"),
  lastname: yup.string().required("Please provide your lastname"),
  amount: yup.string().required("Please provide the amount")
}).required()


export default memo(function Support() {

  const alert_msg = useAlert()

  const [loading, setLoading] = useState(false)

  const {register, handleSubmit, formState: {errors}, watch} = useForm({
    resolver: yupResolver(schema),
})
    const onSuccess = (transaction: any)=>{
      setLoading(false)
     alert_msg.success(`Successful Ref: ${transaction.reference}`)
}
    const onError = (msg: Error)=>{
      setLoading(false)
      alert_msg.error(String(msg.message))
}

async function transact(){
  const paystackInstance = new PaystackPop()
  const money: number = Number(watch("amount"))
    if (money >= 5000 && typeof money == "number") {    
      setLoading(true)
  paystackInstance.newTransaction({
    key: import.meta.env.VITE_TEST_PUBLIC_KEY,
    email: import.meta.env.VITE_MyEmail,
    amount: 100 * money,
    firstName: watch("firstname"),
    lastName: watch("lastname"),
    onSuccess,
    onError
  }) 
}
  else {
    alert_msg.error("Amount must be equal to or greater than 5000 and must be a number")
    setLoading(false)
  }
} 

async function submitForm(data: any){
    await transact()
  }
  return (
    <Fade cascade={true} damping={5} direction="down">
    <div className='container-fluid mt-5'>
      <h2 className='fs-4 text-dark text-center fw-semibold badge rounded-pill bg-warning font-family-codeapp'>Support Us</h2>
      <div>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Form.Group className="mt-3" controlId="formgroupid10">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Firstname:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("firstname")} placeholder="firstname" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold font-family-codeapp'>{errors.firstname?.message}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid32">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Lastname:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("lastname")} placeholder="lastname" className='mw-100 mt-2'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold font-family-codeapp'>{errors.lastname?.message}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid83">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Amount:</Form.Label>
                    <Form.Control autoComplete="off" type="text" {...register("amount")} placeholder="5000" className='mw-100 mt-2'/>
              <p className='text-danger fs-4 lh-base mt-4 fw-semibold font-family-codeapp'>{errors.amount?.message}</p>
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