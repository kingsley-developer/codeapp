"use client";
import {memo} from "react"
import Typewriter from "typewriter-effect"

export default memo(function TypeEffect(){
    const welcome = `<h1 class="text-center fw-bolder
    text-warning home_page_welcome_style" >Welcome To CodeApp.com</h1>`
    return(
      <Typewriter
        options={{
          strings: [welcome],
          autoStart: true,
          loop: true,
        }}
        />
    )
  })