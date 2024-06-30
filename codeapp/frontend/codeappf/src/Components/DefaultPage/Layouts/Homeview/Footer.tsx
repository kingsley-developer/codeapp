"use client";
import {memo} from "react"
import "../../../../assets/default-pgs-styles/homestyles/footer_home_view.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EmailUs from "../../HomeComponents/homeviewparts/EmailUs";

export default memo(function Footer() {
  return (
    <div className="footer_codeapp mt-5 text-center">
      <Row>
        <Col><h1 className="text-white">One</h1></Col>
        <Col><h1 className="text-white">Two</h1></Col>
        <Col md="auto"><EmailUs/></Col>
      </Row>
      </div>
  )
})
