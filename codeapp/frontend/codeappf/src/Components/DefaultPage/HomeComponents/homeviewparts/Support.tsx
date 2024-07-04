"use client";
import {memo, useState} from 'react'
import "../../../declarefiles/declaremodules.d.ts"
import PaystackPop from '@paystack/inline-js'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import * as yup from "yup"

const schema = yup.object({
  firstname: yup.string().required("Please provide your firstname"),
  lastname: yup.string().required("Please provide your lastname"),
  amount: yup.number().required("Please provide the amount"),
}).required()


export default memo(function Support() {

  const [loading, setLoading] = useState(false)

  const {register, handleSubmit, formState: {errors}, watch} = useForm({
    resolver: yupResolver(schema),
})
    const onSuccess = (transaction: any)=>{
      setLoading(false)
      alert(`Successful Ref: ${transaction.reference}`);
    }

    const onError = (msg: Error)=>{
      setLoading(false)
      alert(msg.message);
  }

  function transact(){
    const paystackInstance = new PaystackPop()

    setLoading(true)

    paystackInstance.newTransaction({
        key: import.meta.env.VITE_TEST_PUBLIC_KEY,
        email: import.meta.env.VITE_MyEmail,
        amount: 10000 * Number(watch("amount")),
        firstName: watch("lastname"),
        lastName: watch("lastname"),
        onSuccess,
        onError
    })
  } 

  function submitForm(data){
    transact()
  }
  return (
    <div className='container-fluid mt-3'>
      <h2 className='fs-4 text-dark text-center fw-semibold badge rounded-pill bg-warning'>Support Us</h2>
      <div>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Form.Group className="mt-3" controlId="formgroupid1">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Firstname:</Form.Label>
                    <Form.Control type="text" {...register("firstname")} placeholder="firstname" className='mw-100'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.firstname?.message}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Lastname:</Form.Label>
                    <Form.Control type="text" {...register("lastname")} placeholder="lastname" className='mw-100'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.lastname?.message}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formgroupid3">
                    <Form.Label className='text-light text-center fs-4 fw-semibold'>Enter Amount:</Form.Label>
                    <Form.Control type="text" {...register("amount")} placeholder="20000" className='mw-100'/>
                    <p className='text-danger fs-4 lh-base mt-4 fw-semibold'>{errors.amount?.message}</p>
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