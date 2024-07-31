"use client"
import "../../@types/import.d.ts"
import {memo, useState} from "react"
import setup_scss from "../../assets/setup_profile/setup_profile.module.scss"
import ProfileImage from "@daym3l/react-profile-image"
import { useAppDis, useAppSel} from "../../codeapp-redux-store/Typed-hooks/hooks.ts"
import { useNavigate } from "react-router-dom"
import {add_profile_img} from "../../codeapp-redux-store/userprofile/user_profile"
import { useAlert } from 'react-alert';
import ScrollUpButton from "react-scroll-up-button"
import {Fade} from "react-awesome-reveal"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default memo(function SetUp_Profile() {
    const user = useLocation()

    const img: profile_img_type = {
        profile_img: ""
    }
    const [check, setCheck] = useState(false)
    const img_upload_s = {
        width: "60%",
        height: "90%",
        borderRadius: "80%",
        border: "4px solid gold",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "80px"
    }
    const dispatch = useAppDis()
    const picture_d = useAppSel(state => state.userdata)
    const picture: profile_img_type = picture_d
    const alert_msg = useAlert()
    const toDashboard = useNavigate()

    async function getImages(base64Img: any, fileImg: any) {
        img.profile_img = base64Img
        dispatch(add_profile_img(img))
        setCheck(true)
    }

    async function toDashMain() {
        try{
        if(check){
        const result = await axios.post(`http://localhost:8999/create_user_pic`, {
            data: JSON.stringify({
                username: user.state.username,
                profile_img: picture.profile_img
            })
        })
        const checked = await result.data
        console.log(checked)
            if (checked.check) {
                alert_msg.success(checked.msg)    
                const getNewUser = await axios.get(`http://localhost:8999/get_user_info/?username=${user.state.username}`)
                const data = await getNewUser.data
                console.log(data)

          if (data.check) {
            alert_msg.success(data.msg)
              toDashboard("/dashboard", { state: { userdata: data } })
              setCheck(false)
          }
          else {
            alert_msg.error(data.msg)
            setCheck(false)
          }     
            }
            else {
                alert_msg.error(checked.msg)
                setCheck(false)  
            }
        
        }
        else{
            alert_msg.error("Please upload or take a picture before you go to the dashboard")
            setCheck(false)
            }
        }
        catch (err: any) {
            alert_msg.error(String(err))
            setCheck(false)
        }
    }
    
    return (
        <div className={`bg-dark ${setup_scss.setup_profile_con}`}>
            <ScrollUpButton
          style={{backgroundColor: "gold", width:75}}
        />
        <div className={`container text-center ${setup_scss.setup_profile_margin}`}>
            <Fade cascade={true} damping={5} direction="down">
                <h1 className="text-dark fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp">Setup Your Profile</h1>
                </Fade>
    <Fade cascade={true} damping={5} direction="down">
        <div className={setup_scss.setup_img_style}>
            <ProfileImage
            camera={true}
            styles={img_upload_s}
            defaultImage={img}
            returnImage={getImages}
            isNotImgErrorMsg={"Not an image"}
            uploadBtnProps={{variant:"contained", label:"Upload Photo", color:"primary"}}
            cameraBtnProps={{ variant: "contained", label: "Open Camera", color:"primary"}}
            takeBtnProps={{ variant: "contained", label: "Take Photo", color:"primary"}}
            cancelBtnProps={{variant:"contained", label:"Cancel Photo", color:"primary"}}
            />
        </div>
    </Fade>
    <Fade cascade={true} damping={5} direction="down">
        <p className="fs-3 lh-base fw-semibold text-white mt-5 font-family-codeapp">
        Click next to complete the setup and go to the dashboard 
        </p>
    </Fade>
                
    <Fade cascade={true} damping={5} direction="down">
        <span className={`${setup_scss.downhandstyle_setup} text-primary`}>👇</span>    
    </Fade>

   <Fade cascade={true} damping={5} direction="down">
     <Button
        variant="warning" 
        type="submit" 
        onClick={toDashMain}
        className={`fw-bold mt-5 w-25 fs-4 font-family-codeapp ${setup_scss.centerBtn}`}
        active={check ? false : true} 
        value="Send"><span className='text-center'>Next</span></Button>
    </Fade>
    </div>
        </div>
    )
})