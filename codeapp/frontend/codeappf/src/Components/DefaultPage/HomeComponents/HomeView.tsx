"use client";
import "../../declarefiles/declaremodules.d.ts"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TypeEffect from "./homeviewparts/TypeEffect"
import ImgGallery from "./homeviewparts/ImgGallery.tsx"
import {memo} from "react"
import { devimgs} from "../../../assets/imgs-paths-imports/file_imgs"
import "../../../assets/default-pgs-styles/homestyles/homeview.scss"
import {Fade} from "react-awesome-reveal"
import ScrollUpButton from "react-scroll-up-button"
import Footer from "../Layouts/Homeview/Footer.tsx"

export default memo(function HomeView() {
    return (
      <div>
      <Container fluid="xl">
        <TypeEffect/>
        <ScrollUpButton
        style={{backgroundColor: "gold", width:75}}
        />
        <Fade cascade={true} damping={5} direction="down">
        <img src={devimgs.dev1} 
        alt="" 
        className="border-radius_homeView_imgs_circle mt-5"/>
        </Fade>
        
        <div className="text-wrap text-break text-center text-light mt-5">
        
        <Fade cascade={true} damping={5} direction="down">
        <p className={"fs-3 lh-base fw-semibold bg-dark home_view_des"}>The Ultimate online community and chat app designed specifically for developers
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
        <p className="fs-3 lh-base fw-semibold bg-dark text-white mt-5 home_view_des">
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

    
    <Fade cascade={true} damping={5} direction="down">
    <div className={"mt-5 slider_title_homeview bg-warning text-dark text-break text-center text-wrap fw-bolder lh-sm"}>
    <h2>Coding Community</h2>
    </div>
    <ImgGallery/>
    </Fade>
</Container>
<Footer/>
</div>
)
})