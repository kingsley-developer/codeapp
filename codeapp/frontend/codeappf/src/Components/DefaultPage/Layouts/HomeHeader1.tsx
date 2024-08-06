"use client"
import { NavLink, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {memo, useState} from "react"
import {IoMdHome} from "react-icons/io"
import {FaUserSecret} from "react-icons/fa"
import {GoPeople} from "react-icons/go"
import {MdEmail} from "react-icons/md"
import Footer from "../../FOOTER/Footer";
import SignUp from "../../Sign/SignUp";
import SignIn from "../../Sign/SignIn";
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import home_head_scss from "../../../assets/default-pgs-styles/header-styles/HomeHeader1.module.scss"

export default memo(function HomeHeader1() {
  const [signUP, setSignUp] = useState(false)
  const closeSignUpModal = ()=> setSignUp(false)
   const [signIn, setSignIn] = useState(false)
  const closeSignInModal = ()=> setSignUp(false)
  
  return (
    <div className="bg-dark">
    <Navbar expand="lg" className="bg-body-tertiary text-white bg-dark">
      <div className="container-fluid">
        <Navbar.Brand className="text-white">Codeapp Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-secondary"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
      <div className={home_head_scss.set_gap_header}>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0">
            <li className={home_head_scss.header_text_style}>
              <NavLink to="/" className={({isActive})=> isActive ? `font-family-codeapp nav-link fw-bold px-2 text-warning ${home_head_scss.set_gap_header_nav}` : `font-family-codeapp nav-link fw-bold px-2 text-white ${home_head_scss.set_gap_header_nav}`}
            > <IoMdHome className={`${home_head_scss.bi} d-block mx-auto`}/> Home
            </NavLink>
            </li>
            <li className={home_head_scss.header_text_style}>
              <NavLink to="about" className={({isActive})=> isActive ? `font-family-codeapp nav-link fw-bold px-2 text-warning ${home_head_scss.set_gap_header_nav}` : `font-family-codeapp nav-link fw-bold px-2 text-white ${home_head_scss.set_gap_header_nav}`}
            ><GoPeople className={`${home_head_scss.bi} d-block mx-auto`}/>About
            </NavLink>
            </li>
            <li className={home_head_scss.header_text_style}>
            <NavLink to="privacypolicy" className={({isActive})=> isActive ? `font-family-codeapp nav-link fw-bold px-2 text-warning ${home_head_scss.set_gap_header_nav}` : `font-family-codeapp nav-link fw-bold px-2 text-white ${home_head_scss.set_gap_header_nav}`}
            ><FaUserSecret className={`${home_head_scss.bi} d-block mx-auto`}/>Privacy Policy
            </NavLink>
            </li>
            <li className={home_head_scss.header_text_style}>
              <NavLink to="contactus" className={({isActive})=> isActive ? `font-family-codeapp nav-link fw-bold px-2 text-warning ${home_head_scss.set_gap_header_nav}` : `font-family-codeapp nav-link fw-bold px-2 text-white ${home_head_scss.set_gap_header_nav}`}
            ><MdEmail className={`${home_head_scss.bi} d-block mx-auto`}/>Contact Us
            </NavLink>
            </li>
          </ul>
  
          <div className="text-end">
            <button onClick={() => setSignIn(o => !o)} type="button" className={`btn btn-outline-light me-2 fw-bold font-family-codeapp ${home_head_scss.set_gap_header_nav_btn}`}>Log In</button>
              <button onClick={() => setSignUp(o => !o)} type="button" className={`btn btn-warning fw-bold ${home_head_scss.set_gap_header_nav_btn} font-family-codeapp`}>Sign Up</button>
                  <Popup
                  open={signUP}
                  closeOnDocumentClick
                  onClose={closeSignUpModal}
                  position={"center center"}
                  modal={true}
                  nested={true}
                      >
                    
                <SignUp/>
                    </Popup>
                <Popup
                  open={signIn}
                  closeOnDocumentClick
                  onClose={closeSignInModal}
                  position={"center center"}
                  modal={true}
                  nested={true}
                  >
                    
                <SignIn/>
                </Popup>
            </div>
          </div>
                
      </div>
  
          </Nav>
            </Navbar.Collapse>
      </div>
      </Navbar>
     <Outlet/>
     <Footer/>
      </div>
  );
})