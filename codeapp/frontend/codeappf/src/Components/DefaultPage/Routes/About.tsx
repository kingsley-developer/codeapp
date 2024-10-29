"use client";
import {memo, useEffect} from "react"
import "../../../@types/import.d.ts"
import about_scss from "../../../assets/default-pgs-styles/about-styles/about.module.scss"
import about_img1 from "../../../assets/about-imgs/a.jpg"
import about_img2 from "../../../assets/about-imgs/b.jpg"
import about_img3 from "../../../assets/about-imgs/c.jpg"
import { Fade } from "react-awesome-reveal"
import ScrollUpButton from "react-scroll-up-button"
import { useNavigate } from "react-router-dom"


export default memo(function About() {
    const route = useNavigate()
    const getAccessToken = localStorage.getItem("accessToken")
    const user_id = localStorage.getItem("user_id")
    console.log(user_id, getAccessToken)

    useEffect(() => {
    async function validate_User() {
       if (getAccessToken && user_id) {
    route(`/dashboard/${user_id}`)
    return null
  }
  route("/about")   
    }
    validate_User()
  }, [])

    return (
      <div>
        <ScrollUpButton
          style={{backgroundColor: "gold", width:75}}
        />
      <div className={`container-fluid ${about_scss.aboutMain} bg-dark`}>
        <Fade cascade={true} damping={5} direction="down">
        <img src={about_img1} className={about_scss.aboutImgsstyles} alt="Bootstrap Themes" loading="lazy"/>
        </Fade>
        <div className="mt-5 container-fluid text-center">
          <Fade cascade={true} damping={5} direction="down">
        <p className="fs-3 lh-base fw-semibold bg-dark text-white font-family-codeapp">
          At codeapp.com, we're passionate about empowering developers to build innovative solutions, advance their careers, and
          connect with like-minded individuals who share their passion for coding. Our chatapp is designed to facilitate seamless
          communication, collaboration, and knowledge-sharing among developers, providing a platform for them to come together,
          learn from each other, and drive progress in the tech industry.      
        </p>
            </Fade>

             <Fade cascade={true} damping={5} direction="down" className="mt-5">
        <img src={about_img2} className={about_scss.aboutImgsstyles} alt="Bootstrap Themes" loading="lazy"/>
            </Fade>
            
          <Fade cascade={true} damping={5} direction="down">
        <p className="fs-3 lh-base fw-semibold bg-dark text-white font-family-codeapp mt-5">
          With features like real-time messaging, video conferencing, and file sharing, our platform enables developers to work
          together more efficiently, solve problems more effectively, and stay up-to-date on the latest industry trends and technologies
          Whether you're a seasoned pro or just starting out, our community is dedicated to providing a supportive and inclusive environment
          where you can ask questions, share your expertise, and grow your network.      
        </p>
        </Fade>

         <Fade cascade={true} damping={5} direction="down" className="mt-5">
        <img src={about_img3} className={about_scss.aboutImgsstyles} alt="Bootstrap Themes" loading="lazy"/>
        </Fade>

          <Fade cascade={true} damping={5} direction="down">
        <p className="fs-3 lh-base fw-semibold bg-dark text-white font-family-codeapp mt-5">
          By joining codeapp.com, you'll gain access to a vibrant community of developers, exclusive content and resources, and opportunities
                to participate in hackathons, coding challenges, and other fun events. Our mission is to foster a culture of collaboration, innovation,
          and continuous learning, and we're committed to providing the tools and resources needed to help developers succeed.     
        </p>
        </Fade>
        </div>
      </div>
      </div>
    )
  }
)