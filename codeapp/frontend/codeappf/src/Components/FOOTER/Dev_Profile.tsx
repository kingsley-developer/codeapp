"use client"
import {memo} from "react"
import { kinsley_pic} from "../../assets/imgs-paths-imports/file_imgs"
import dev_footer_style from "../../assets/footer/Dev_Profile.module.scss"
import Title_Dev from "./Title_Dev"
import {Fade} from "react-awesome-reveal"

export default memo(function Dev_Profile(){
    return (
         <Fade cascade={true} damping={5} direction="down">
        <div className="container-fluid mt-5">
        <h2 className="fs-4 text-dark text-center fw-semibold badge rounded-pill bg-warning font-family-codeapp">Site Owner</h2>
                <img src={kinsley_pic}
                    alt=""
                    className={`${dev_footer_style.border_radius_dev_imgs_circle} mt-4`} />
        <Title_Dev/>
            </div>
        </Fade>
    )
})