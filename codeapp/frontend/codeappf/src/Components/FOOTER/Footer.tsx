"use client";
import {memo} from "react"
import footerStyle from "../../assets/footer/footer.module.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EmailUs from "./EmailUs";
import Support from "./Support";
import Sponsors from "./Sponsors";
import Dev_Profile from "./Dev_Profile";
import { SocialIcon } from "react-social-icons"

export default memo(function Footer() {
  return (
    <div className={`${footerStyle.footerCodeapp} mt-5 text-center container-fluid`}>
      <Row>
        <Col md="auto"><Sponsors/></Col>
        <Col md="auto"><Dev_Profile/></Col>
        <Col><Support/></Col>
        <Col><EmailUs/></Col>
      </Row>
      <div className="container-fluid text-center mt-5">
        <h4 className="fs-4 text-dark fw-semibold badge rounded-pill bg-warning font-family-codeapp">Follow Us:</h4>
        <div className="mt-4">
        <SocialIcon url="https://www.facebook.com/kingsley.anyichie.77" fgColor="black" bgColor="white"/>
          <SocialIcon url="https://www.github.com/kingsley-developer" fgColor="black" bgColor="white" className={footerStyle.socialIconDesign}/>
          <SocialIcon url="https://www.instagram.com/kingsleyanyichie9?igsh=N21jem1neHJlenpk" fgColor="black" bgColor="white" className={footerStyle.socialIconDesign} />
          <SocialIcon url="https://x.com/KingsleyAnyich3?s=09" fgColor="black" bgColor="white" className={footerStyle.socialIconDesign}/>
        </div>                
        </div>
      <div className={`mt-5 container-fluid text-center ${footerStyle.copywriteFooter}`}>
        <span className="font-family-codeapp text-warning fs-4 fw-semibold">&copy;2024 Codeapp.com. All rights reserved.</span>
      </div>
      </div>
  )
})
