"use client";
import {memo} from "react"
import Footer from "../../FOOTER/Footer";
import { Fade } from "react-awesome-reveal"
import privacy_scss from "../../../assets/default-pgs-styles/privacy-styles/privacy.module.scss"
import privacy_img1 from "../../../assets/policy-imgs/a.jpg"
import "../../declarefiles/declaremodules.d.ts"
import ScrollUpButton from "react-scroll-up-button"
import Button from "react-bootstrap/Button"
import { Link} from "react-router-dom"

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
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>INTRODUCTION</h2>
            <p className="text-center text-white fs-4 fw-semibold font-family-codeapp mt-5">We value your privacy and are committed to protecting your personal information. This privacy policy explains
              how we collect, use, and disclose information when you use our developer chat website.
            </p>
          </div>
        </Fade>

        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>2</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>INFORMATION WE COLLECT</h2>
            <ol className="mt-5">
              <li className={`text-center text-warning fs-4 fw-bold font-family-codeapp`}>ACCOUNT INFORMATION:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>When You Create an account, we collect your username, email address, and password.</p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>CHAT DATA:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We collect the content of your chats, including messages, code snippets, and other text-based data.</p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>PROFILE INFORMATION:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  You may optionally provide additional information, such as your name, profile picture, and bio.</p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>LOG DATA:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We collect logs of your website activity, including IP addresses, browser types, and device information.
                </p>
              </li>
                <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>COOKIE DATA:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We use cookies to store your preferences and session information.
                </p>
              </li>
            </ol>
          </div>
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>3</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>HOW WE USE YOUR INFORMATION</h2>
            <ol className="mt-5">
              <li className={`text-center text-warning fs-4 fw-bold font-family-codeapp`}>PROVIDE AND IMPROVE THE SITE:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We use your information to provide and improve the site, including debugging and troubleshooting.
                </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>PERSONALIZE YOUR EXPERIENCE:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We use your information to personalize your experience, such as displaying your profile information and chat history.
                </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>COMMUNICATE WITH YOU:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We use your information to send you notifications, updates, and support messages.
              </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>COMPLY WITH LEGAL OBLIGATIONS:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We use your information to comply with legal obligations, such as responding to subpoenas and maintaining records.
                </p>
              </li>
            </ol>
          </div>
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>4</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>INFORMATION SHARING</h2>
            <ol className="mt-5">
              <li className={`text-center text-warning fs-4 fw-bold font-family-codeapp`}>THIRD-PARTY SERVICE PROVIDERS:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We share your information with third-party service providers, such as cloud hosting services and analytics providers.
                </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>LEGAL COMPLIANCE:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We share your information with law enforcement agencies and courts to comply with legal obligations.
                </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>BUSINESS TRANSFERS:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  We share your information with acquirers, successors, or assignees in the event of a merger, acquisition, or sale.
              </p>
              </li>
            </ol>
          </div>
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>5</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>DATA RETENTION</h2>
            <p className="text-center text-white fs-4 fw-semibold font-family-codeapp mt-5">
              We retain your information for as long as your account is active or as needed to provide the site. We may retain
              logs and chat data for a longer period to ensure the integrity and security of the site.
            </p>
          </div>
        </Fade>
         <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>6</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>DATA SECURITY</h2>
            <p className="text-center text-white fs-4 fw-semibold font-family-codeapp mt-5">
              We implement appropriate security measures to protect your information from unauthorized access, disclosure, or use.
            </p>
          </div>
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>7</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>YOUR RIGHTS</h2>
            <ol className="mt-5">
              <li className={`text-center text-warning fs-4 fw-bold font-family-codeapp`}>ACCESS AND CORRECTION:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  You have the right to access and correct your personal information.
                </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>DELETION:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  You have the right to request deletion of your personal information.
                </p>
              </li>
              <li className={`mt-5 text-center text-warning fs-4 fw-bold font-family-codeapp`}>OBJECT TO PROCESSING:
                <p className={`text-center text-white fs-4 fw-semibold font-family-codeapp`}>
                  You have the right to object to processing of your personal information.
              </p>
              </li>
            </ol>
          </div>
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>8</div>
          </div>
          <div>
            <h2 className={`fs-3 text-center badge rounded-pill bg-warning text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>CHANGES TO THIS PRIVACY POLICY</h2>
            <p className="text-center text-white fs-4 fw-semibold font-family-codeapp mt-5">
              We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on the site.
            </p>
          </div>
        </Fade>
        <Fade cascade={true} damping={5} direction="down">
            <div className={privacy_scss.circle_container_num}>
              <div className={privacy_scss.circle_num}>9</div>
          </div>
          <div>
            <h2 className={`text-center badge rounded-pill bg-warning fs-3 text-dark fw-bold font-family-codeapp
              ${privacy_scss.center_policy_topics}`}>CONTACT US</h2>
            <p className="text-center text-white fs-4 fw-semibold font-family-codeapp mt-5">
              If you have any questions or concerns about this privacy policy, please click this button below to redirect you to the contact us page
              or navigate to the footer to contact us.
            </p>
            <Link to="/contactus" className={privacy_scss.set_na_to_cus}>
            <Button
                variant="warning" 
                type="submit" 
                className={`fw-bold mt-5 w-50 fs-5 font-family-codeapp ${privacy_scss.set_na_to_cus_btn}`}
                active 
                value="Send">To Contact Us</Button>
              </Link>
          </div>
        </Fade>
      </div>
      <Footer/>
    </div>
  )
})