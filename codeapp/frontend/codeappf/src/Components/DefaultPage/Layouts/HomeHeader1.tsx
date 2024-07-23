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

export default memo(function HomeHeader1() {
  const [sign, setSign] = useState(false)
  
  return (
    <div className="bg-dark">
    <Navbar expand="lg" className="bg-body-tertiary text-white bg-dark">
      <div className="container-fluid">
        <Navbar.Brand className="text-white">Codeapp Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-secondary"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
      <div className="set-gap-header">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0">
            <li className="header_text_style">
              <NavLink to="/" end className={({isActive})=> isActive ? "font-family-codeapp nav-link fw-bold px-2 text-warning set-gap-header_nav" : "font-family-codeapp nav-link fw-bold px-2 text-white set-gap-header_nav"}
            > <IoMdHome className="bi d-block mx-auto"/> Home
            </NavLink>
            </li>
            <li className="header_text_style">
              <NavLink to="about" end className={({isActive})=> isActive ? "font-family-codeapp nav-link px-2 fw-bold text-warning set-gap-header_nav" : "font-family-codeapp set-gap-header_nav nav-link fw-bold px-2 text-white"}
            ><GoPeople className="bi d-block mx-auto"/>About
            </NavLink>
            </li>
            <li className="header_text_style">
            <NavLink to="privacypolicy" end className={({isActive})=> isActive ? "set-gap-header_nav nav-link px-2 fw-bold text-warning font-family-codeapp" : "font-family-codeapp set-gap-header_nav nav-link fw-bold px-2 text-white"}
            ><FaUserSecret className="bi d-block mx-auto"/>Privacy Policy
            </NavLink>
            </li>
            <li className="header_text_style">
              <NavLink to="contactus" end className={({isActive})=> isActive ? "set-gap-header_nav nav-link px-2 fw-bold text-warning font-family-codeapp" : "font-family-codeapp set-gap-header_nav nav-link fw-bold px-2 text-white"}
            ><MdEmail className="bi d-block mx-auto"/>Contact Us
            </NavLink>
            </li>
          </ul>
  
          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2 fw-bold font-family-codeapp set-gap-header_nav_btn">Login</button>
            <button onClick={()=> setSign(true)} type="button" className="btn btn-warning fw-bold set-gap-header_nav_btn font-family-codeapp">Sign-up</button>
          </div>
          </div>
                
      </div>
  
          </Nav>
            </Navbar.Collapse>
      </div>
      </Navbar>
      <SignUp open={sign}/>
     <Outlet/>
     <Footer/>
      </div>
  );
})