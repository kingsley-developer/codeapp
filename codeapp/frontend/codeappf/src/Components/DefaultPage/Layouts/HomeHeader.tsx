"use client";
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import {memo} from "react"
import {IoMdHome} from "react-icons/io"
import {FaUserSecret} from "react-icons/fa"
import {GoPeople} from "react-icons/go"
import {MdEmail} from "react-icons/md"
export default memo(function HomeHeader() {
    return (
      <div>
      <header className="p-3 bg-dark text-white fixed-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="fs-4 d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          Hello
          </a>
  
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="header_text_style">
              <NavLink to="/" end className={({isActive})=> isActive ? "nav-link px-2 fs-4 text-warning" : " nav-link px-2 text-white fs-4"}
            > <IoMdHome className="bi d-block mx-auto"/> Home
            </NavLink>
            </li>
            <li className="header_text_style">
              <NavLink to="about" end className={({isActive})=> isActive ? "nav-link px-2 fs-4 text-warning" : " nav-link px-2 text-white fs-4"}
            ><GoPeople className="bi d-block mx-auto"/>About
            </NavLink>
            </li>
            <li className="header_text_style">
            <NavLink to="privacypolicy" end className={({isActive})=> isActive ? "nav-link px-2 fs-4 text-warning" : " nav-link px-2 text-white fs-4"}
            ><FaUserSecret className="bi d-block mx-auto"/>Privacy Policy
            </NavLink>
            </li>
            <li className="header_text_style">
              <NavLink to="contactus" end className={({isActive})=> isActive ? "nav-link px-2 fs-4 text-warning" : " nav-link px-2 text-white fs-4"}
            ><MdEmail className="bi d-block mx-auto"/>Contact Us
            </NavLink>
            </li>
          </ul>
  
          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">Login</button>
            <button type="button" className="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
    <Outlet/>
    </div>
    )
})