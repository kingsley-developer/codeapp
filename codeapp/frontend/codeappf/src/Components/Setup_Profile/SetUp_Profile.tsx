"use client"
import {memo} from "react"
import setup_scss from "../../assets/setup_profile/setup_profile.module.scss"

export default memo(function SetUp_Profile(){
    return(
        <div className={`bg-dark ${setup_scss.setup_profile_con}`}>
        <div className={`container text-center ${setup_scss.setup_profile_margin}`}>
            <h1 className="text-dark fs-4 fw-semibold badge rounded-pill bg-warning font-family-codeapp">Setup Your Profile</h1>
        </div>
        </div>
    )
})