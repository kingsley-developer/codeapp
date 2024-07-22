import {memo} from 'react'
import notfound_scss from "../../assets/NOTFOUND/NotFound.module.scss"
import { Fade } from "react-awesome-reveal"

export default memo(function NotFound() {
    return (
      <div className={`bg-dark container-fluid ${notfound_scss.setSize_Not}`}>
        <div className="text-white text-center">
          <Fade cascade={true} damping={5} direction="down">
          <div>
          <h1 className={notfound_scss.emoji_style}>😢</h1>
            </div>
          </Fade>
          <div className={notfound_scss.notfound_text}>
          <Fade cascade={true} damping={5} direction="down">
              <p className={"fs-3 fw-semibold font-family-codeapp"}>
                Oh no! it looks like the page you're looking for has gone missing!
                Please enter the correct URL of this website.
        </p>
            </Fade>
        </div>
            </div>
    </div>
  )
})