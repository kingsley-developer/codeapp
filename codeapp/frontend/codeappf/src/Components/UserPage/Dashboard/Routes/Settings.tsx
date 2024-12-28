"use client"
import {memo, useCallback, useState, useEffect} from 'react'
import route from "../../../../assets/User/routes/Setting.module.scss"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useAlert } from 'react-alert';
import axios from "axios"
import ProfileImage from "@daym3l/react-profile-image"
import "../../../../@types/import.d.ts"
import d_img from "../../../../assets/default-img/a.png"

async function getImages(base64Img: any, fileImg: any) {
  console.log(base64Img, fileImg)
}

const img_upload_s = {
        width: "70%",
        height: "40%",
        borderRadius: "70%",
        border: "4px solid gold",
        display: "block",
        marginLeft: "100px",
        marginTop: "60px",
}

export default memo(function Settings() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    user_password: "",
    user_email: "",
})

const [user2, setUser2] = useState({
  user_id: 0,
  first_name: "",
  last_name: "",
  user_name: "",
  user_password: "",
  user_email: "",
})
 const alert_msg = useAlert()
  const getAccessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")
  const [loadingF, setLoadingF] = useState(false)
  const [sort, setSort] = useState(false)
  const [loadingL, setLoadingL] = useState(false)
  const [loadingU, setLoadingU] = useState(false)
  const [loadingE, setLoadingE] = useState(false)
  const [loadingP, setLoadingP] = useState(false)

    useEffect(() => {
      async function getUser() {
        try{
          if(user_id && getAccessToken){
            const getSavedUser = await axios.get(`http://localhost:8999/get_saved_user/?user_id=${Number(user_id)}`)
        const data2: savedUserData = await getSavedUser.data
        console.log(data2, "jjj")
        if (data2.check) {
         const userData = data2.data[0] 
        setUser2(userData)  
        }
        }
        else{
          setUser2({
            user_id: 0,
            first_name: "",
            last_name: "",
            user_name: "",
            user_password: "",
            user_email: "",
          })
        }
        }
        catch (e: any) {
          setUser2({
            user_id: 0,
            first_name: "",
            last_name: "",
            user_name: "",
            user_password: "",
            user_email: "",
          })   
      }  
        
      }
      
      getUser()
    }, [sort]) 

  const firstname = async()=>{
    try{
      if(user_id && getAccessToken){
        setLoadingF(true)
        console.log(user)
        const submit = await axios.post(`http://localhost:8999/update_user`, {
          data: JSON.stringify({
            id:user_id,
            firstname:user.first_name,
            lastname:user.last_name,
            username:user.user_name,
            password:user.user_password,
            email:user.user_email,
            updateType:"firstname"
         })
        }
      )
      const data = await submit.data
      if(data.check){
        alert_msg.success(data.msg)
        setLoadingF(false)
        setSort(true)
      }
      else{
        setLoadingF(false)
        setSort(false)
      }   
      }
  }
  catch (e: any) {
    alert_msg.error(String(e))
    setLoadingF(false)
    setSort(false) 
  }  
  }

  function update_first(e:React.ChangeEvent){
    setUser((p)=>{
      return {
        ...p,
          first_name: e.target.value
      }
    })
  }

  const lastname = async()=>{
    try{
      if(user_id && getAccessToken){
        setLoadingL(true)
        console.log(user)
        const submit = await axios.post(`http://localhost:8999/update_user`, {
          data: JSON.stringify({
            id:user_id,
            firstname:user.first_name,
            lastname:user.last_name,
            username:user.user_name,
            password:user.user_password,
            email:user.user_email,
            updateType:"lastname"
         })
        }
      )
      const data = await submit.data
      if(data.check){
        alert_msg.success(data.msg)
        setLoadingL(false)
        setSort(true)
      }
      else{
        setLoadingL(false)
        setSort(false)
      }   
      }
  }
  catch (e: any) {
    alert_msg.error(String(e))
    setLoadingL(false)
    setSort(false) 
  }  
  }

  function update_last(e:React.ChangeEvent){
    setUser((p)=>{
      return {
        ...p,
          last_name: e.target.value
      }
    })
  }

  const username = async()=>{
    try{
      if(user_id && getAccessToken){
        setLoadingU(true)
        console.log(user)
        const submit = await axios.post(`http://localhost:8999/update_user`, {
          data: JSON.stringify({
            id:user_id,
            firstname:user.first_name,
            lastname:user.last_name,
            username:user.user_name,
            password:user.user_password,
            email:user.user_email,
            updateType:"username"
         })
        }
      )
      const data = await submit.data
      if(data.check){
        alert_msg.success(data.msg)
        setLoadingU(false)
        setSort(true)
      }
      else{
        setLoadingU(false)
        setSort(false)
      }   
      }
  }
  catch (e: any) {
    alert_msg.error(String(e))
    setLoadingU(false)
    setSort(false) 
  }  
  }

  function update_user(e:React.ChangeEvent){
    setUser((p)=>{
      return {
        ...p,
          user_name: e.target.value
      }
    })
  }

  const email = async()=>{
    try{
      if(user_id && getAccessToken){
        setLoadingE(true)
        console.log(user)
        const submit = await axios.post(`http://localhost:8999/update_user`, {
          data: JSON.stringify({
            id:user_id,
            firstname:user.first_name,
            lastname:user.last_name,
            username:user.user_name,
            password:user.user_password,
            email:user.user_email,
            updateType:"email"
         })
        }
      )
      const data = await submit.data
      if(data.check){
        alert_msg.success(data.msg)
        setLoadingE(false)
        setSort(true)
      }
      else{
        setLoadingE(false)
        setSort(false)
      }   
      }
  }
  catch (e: any) {
    alert_msg.error(String(e))
    setLoadingE(false)
    setSort(false) 
  }  
  }
  function update_email(e:React.ChangeEvent){
    setUser((p)=>{
      return {
        ...p,
        user_email: e.target.value
      }
    })
  }
  const password = async()=>{
    try{
      if(user_id && getAccessToken){
        setLoadingP(true)
        console.log(user)
        const submit = await axios.post(`http://localhost:8999/update_user`, {
          data: JSON.stringify({
            id:user_id,
            firstname:user.first_name,
            lastname:user.last_name,
            username:user.user_name,
            password:user.user_password,
            email:user.user_email,
            updateType:"password"
         })
        }
      )
      const data = await submit.data
      if(data.check){
        alert_msg.success(data.msg)
        setLoadingP(false)
        setSort(true)
      }
      else{
        setLoadingP(false)
        setSort(false)
      }   
      }
  }
  catch (e: any) {
    alert_msg.error(String(e))
    setLoadingP(false)
    setSort(false) 
  }  
  }

  function update_password(e:React.ChangeEvent){
    setUser((p)=>{
      return {
        ...p,
        user_password: e.target.value
      }
    })
  }

  return (
    <div>
      <h1 className="text-white">Settings</h1>
      <h1 className="text-white mt-5">Update Profile Picture</h1>
      <div className={route.profile_img_settings}>
      <ProfileImage
            camera={true}
            styles={img_upload_s}
            defaultImage={d_img}
            returnImage={getImages}
            uploadBtnProps={{variant: "contained", label: "Upload Photo", color: "primary", size:"small"}}
            cameraBtnProps={{ variant: "contained", label: "Open Camera", color: "primary", size:"small"}}
            takeBtnProps={{ variant: "contained", label: "Take Photo", color:"primary", size:"small"}}
            cancelBtnProps={{variant:"contained", label:"Cancel Photo", color:"primary", size:"small"}}
            isNotImgErrorMsg={"Not an image"}
            />
            </div>

            <div className="text-white mt-5">
              <h2 className="text-warning">FirstName: <span className="text-white">{user2.first_name}</span></h2>
              <h2 className="text-warning">LastName: <span className="text-white">{user2.last_name}</span></h2>
              <h2 className="text-warning">UserName: <span className="text-white">{user2.user_name}</span></h2>
              <h2 className="text-warning">Email: <span className="text-white">{user2.user_email}</span></h2>
            </div>
      <Form>
                <Form.Group className="mt-5" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Firstname:</Form.Label>
                    <Form.Control autoComplete="off" type="text" placeholder="firstname" className='mw-100 mt-2' onChange={update_first}/>
                </Form.Group>
                <Button
                variant="warning" 
                type="submit" 
                className='mt-5 mb-5 fw-bold w-50 fs-4 font-family-codeapp'
                value="Send"
                onClick={firstname}
                active={loadingF ? false : true}
                disabled={loadingF ? true : false}
                >{loadingF ? <span>Submitting</span> : <span>Submit</span>}</Button>
                
                <Form.Group className="mt-5" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Lastname:</Form.Label>
                    <Form.Control autoComplete="off" type="text" placeholder="lastname" className='mw-100 mt-2' onChange={update_last}/>
                </Form.Group>
                <Button
                variant="warning" 
                type="submit" 
                onClick={lastname}
                active={loadingL ? false : true}
                disabled={loadingL ? true : false}
                className='mt-5 mb-5 fw-bold w-50 fs-4 font-family-codeapp'
                value="Send">{loadingL ? <span>Submitting</span> : <span>Submit</span>}</Button>

                <Form.Group className="mt-5" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Username:</Form.Label>
                    <Form.Control autoComplete="off" type="text" placeholder="username" className='mw-100 mt-2' onChange={update_user}/>
                </Form.Group>
                <Button
                variant="warning" 
                type="submit" 
                className='mt-5 mb-5 fw-bold w-50 fs-4 font-family-codeapp'
                onClick={username}
                active={loadingU ? false : true}
                disabled={loadingU ? true : false}
                value="Send">{loadingU ? <span>Submitting</span> : <span>Submit</span>}</Button>
                
                <Form.Group className="mt-5" controlId="formgroupid2">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Email:</Form.Label>
                    <Form.Control autoComplete="off" type="text" placeholder="email@gmail.com" className='mw-100 mt-2' onChange={update_email}/>
                </Form.Group>
                <Button
                variant="warning" 
                type="submit" 
                onClick={email}
                active={loadingE ? false : true}
                disabled={loadingE ? true : false}
                className='mt-5 mb-5 fw-bold w-50 fs-4 font-family-codeapp'
                value="Send">{loadingE ? <span>Submitting</span> : <span>Submit</span>}</Button>
                
                <Form.Group className="mt-3" controlId="formgroupid3">
                    <Form.Label className='text-light text-center fs-4 fw-semibold font-family-codeapp'>Enter Password:</Form.Label>
                    <Form.Control autoComplete="off" type="password" placeholder="foot123" className='mw-100 mt-2' onChange={update_password}/>
          </Form.Group>
          <Button
                variant="warning" 
                type="submit" 
                onClick={password}
                active={loadingP ? false : true}
                disabled={loadingP ? true : false}
                className='mt-5 mb-5 fw-bold w-50 fs-4 font-family-codeapp'
                value="Send">{loadingP ? <span>Submitting</span> : <span>Submit</span>}</Button>
            </Form>
    </div>
  )
})

