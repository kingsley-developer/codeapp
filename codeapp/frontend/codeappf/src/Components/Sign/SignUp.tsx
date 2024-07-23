import {memo} from 'react'
import signup_scss from "../../assets/Sign/SignUp.module.scss"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import NewWindow from "react-new-window"

type datatype = {
  open: boolean
}
export default memo(function SignUp({ open }: datatype) {
  console.log(open)
  return (
    <div>Sign up</div>
  )
})

