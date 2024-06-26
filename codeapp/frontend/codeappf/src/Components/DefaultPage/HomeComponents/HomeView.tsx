"use client";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TypeEffect from "./homeviewparts/TypeEffect"
import {memo} from "react"
import { devimgs } from "../../../assets/imgs-paths-imports/file_imgs"
import "../../../assets/default-pgs-styles/homestyles/homeview.scss"
import {Fade} from "react-awesome-reveal"

export default memo(function HomeView() {
    return (
      <Container fluid="xl">
        <TypeEffect/>
        <Fade cascade={true} damping={5} direction="down">
        <img src={devimgs.dev1} 
        alt="" 
        className="border-radius_homeView_imgs_circle mt-5"/>
        </Fade>
        
        <div className="text-wrap text-break text-center text-light mt-5">
        
        <Fade cascade={true} damping={5} direction="down">
        <p className={"fs-3 lh-base fw-semibold bg-primary home_view_des"}>The Ultimate online community and chat app designed specifically for developers
          like you! Whether you're working on a solo project or collaborating with a team,
          our platform provides a seamless and intuitive way to connect with fellow developers, share 
          knowledge, and get help when you need it.
        </p>
        </Fade>

        <Fade cascade={true} damping={5} direction="down">
        <img src={devimgs.dev2} 
        alt="" 
        className="border-radius_homeView_imgs_circle mt-5"/>
        </Fade>

        <Fade cascade={true} damping={5} direction="down">
        <p className="fs-3 lh-base fw-semibold bg-dark mt-5 home_view_des">With features like real-time messaging, joining & creating rooms, code snippet sharing,
        and video conferencing, CodeApp is the perfect tool for taking your projects to the next level.
        Join our vibrant community of innovators and start chatting with fellow developers from around the world!
        </p>
        </Fade>

        <Fade cascade={true} damping={5} direction="down">
        <img src={devimgs.dev3} 
        alt="" 
        className="border-radius_homeView_imgs_circle mt-5"/>
        </Fade>

        <Fade cascade={true} damping={5} direction="down">
        <p className="fs-3 lh-base fw-semibold bg-success mt-5 home_view_des">
          Sign up now to create your profile, connect with other developers, and start coding together.
          Already a member? Click the sign in button to access your account and dive back into the 
          conversation.
        </p>
        </Fade>
        </div>
        
        <div className="text-center mt-5">
        <Fade cascade={true} damping={5} direction="down">
          <Row>
            <Col lg={true}>
            <Button variant="outline-warning" size="lg" >Sign up</Button>
            </Col>
            <Col lg={true}>
            <Button variant="outline-warning" size="lg">Sign In</Button>
            </Col>
          </Row>
          </Fade>
        </div>
      </Container>
    )
})