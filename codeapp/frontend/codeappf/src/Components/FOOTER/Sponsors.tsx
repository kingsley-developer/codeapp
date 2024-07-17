"use client";
import { memo } from "react"
import { sponsor_img} from "../../assets/imgs-paths-imports/file_imgs"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import sponsor_style from  "../../assets/footer/sponsors.module.scss"
import {Fade} from "react-awesome-reveal"

export default memo(function Sponsors() {
  return (
    <Fade cascade={true} damping={5} direction="down">
    <div className="container-fluid mt-4">
      <h2 className="fs-4 text-dark text-center fw-semibold badge rounded-pill bg-warning font-family-codeapp">Our Brand Sponsors</h2>
      <div className="mt-4">
        <Row>
        <Col><img src={sponsor_img.s1} className={sponsor_style.borderRadiusSupportImgsCircle}/> </Col>
        <Col><img src={sponsor_img.s2} className={sponsor_style.borderRadiusSupportImgsCircle}/> </Col>
        <Col><img src={sponsor_img.s4} className={sponsor_style.borderRadiusSupportImgsCircle}/></Col>
        <Col><img src={sponsor_img.s5} className={sponsor_style.borderRadiusSupportImgsCircle}/></Col>
        <Col><img src={sponsor_img.s6} className={sponsor_style.borderRadiusSupportImgsCircle}/></Col>
        <Col><img src={sponsor_img.s7} className={sponsor_style.borderRadiusSupportImgsCircle}/></Col>
        <Col><img src={sponsor_img.s8} className={sponsor_style.borderRadiusSupportImgsCircle}/></Col>
        <Col><img src={sponsor_img.s9} className={sponsor_style.borderRadiusSupportImgsCircle}/></Col>
      </Row>
      </div>
    </div>
    </Fade>
  )
})