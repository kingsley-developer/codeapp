import {memo, useEffect, useState} from 'react'
import "../../../declarefiles/declaremodules.d.ts"
import PaystackPop from '@paystack/inline-js'
import axios from "axios"
//import {useForm} from "react-hook-form"
//import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

async function getPayStackKeys(){
    const keys = await axios.get("http://localhost:8670/paystack_keys")
    return keys.data
}

const schema = yup.object({
  email: yup.string().required("Please provide an email address"),
  message: yup.string().required("Please provide the message")
}).required()


export default memo(function Support() {

  const [pay_key, set_pay_key] = useState({
    LIVE_LIVE_KEY: "",
    LIVE_PUBLIC_KEY: "",
    TEST_PUBLIC_KEY: ""
})

console.log(pay_key)

    useEffect(()=>{
        async function payKeys(){
          const data = await getPayStackKeys()
          set_pay_key(data)
        }
        payKeys()
    }, [])

    const onSuccess = (transaction: any)=>{
        alert(`Successful Ref: ${transaction.reference}`);
    }

  function transact(){
    const paystackInstance = new PaystackPop()

    paystackInstance.newTransaction({
        key: pay_key.TEST_PUBLIC_KEY,
        email: "kingsleyanyichie@gmail.com",
        amount: 10000,
        onSuccess
    })
  } 
  return (
    <div>Support</div>
  )
})