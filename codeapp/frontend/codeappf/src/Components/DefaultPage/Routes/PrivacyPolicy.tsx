"use client";
import {memo} from "react"
import Footer from "../../FOOTER/Footer";
import { Fade } from "react-awesome-reveal"
import privacy_scss from "../../../assets/default-pgs-styles/privacy-styles/privacy.module.scss"
import privacy_img1 from "../../../assets/policy-imgs/a.jpg"
import "../../declarefiles/declaremodules.d.ts"
import ScrollUpButton from "react-scroll-up-button"

export default memo(function PrivacyPolicy() {
  return (
    <div className={privacy_scss.privacy_margin}>
       <ScrollUpButton
          style={{backgroundColor: "gold", width:75}}
        />
      <div className="bg-dark container">
        <Fade cascade={true} damping={5} direction="down">
          <h1 className={
            `text-center badge rounded-pill bg-warning text-dark fs-4 fw-bold font-family-codeapp
            ${privacy_scss.center_policy_heading}`}>
              OUR PRIVACY POLICIES
          </h1>
          </Fade>
          <Fade cascade={true} damping={5} direction="down">
            <img src={privacy_img1}
              alt=""
              className={`${privacy_scss.first_img_policy}  mt-5`} />
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>1</div>
          </div>
          <div>
            <h2 className={`text-center badge rounded-pill bg-warning text-dark fs-4 fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>INTRODUCTION</h2>
            <p className="text-center text-white fs-4 fw-semibold font-family-codeapp mt-5">We value your privacy and are committedd to protecting your personal information. This privacy policy explains
              how we collect, use, and disclose information when you use our developer chat website.
            </p>
          </div>
        </Fade>

        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>2</div>
          </div>
          <div>
            <h2 className={`text-center badge rounded-pill bg-warning text-dark fs-4 fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>INFORMATION WE COLLECT</h2>
            <ol className="mt-5">
              <li className={`text-center text-white fs-4 fw-bold font-family-codeapp`}>ACCOUNT INFORMATION:</li>
            </ol>
          </div>
        </Fade>
      </div>
      <Footer/>
    </div>
  )
})