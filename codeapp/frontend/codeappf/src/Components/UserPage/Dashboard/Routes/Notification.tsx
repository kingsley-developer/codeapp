"use client"
import {memo} from 'react'
import route from "../../../../assets/User/routes/Notification.module.scss"
import { Fade } from "react-awesome-reveal"

export default memo(function Notification() {
  return (
      <div>
        <Fade cascade={true} damping={5} direction="down">
          <span className={`${route.downhandstyle_notifi}`}>👇</span>
        </Fade>
          <h2 className={`text-white ${route.empty_notify}`}>Empty Notification</h2>
    </div>
  )
})

