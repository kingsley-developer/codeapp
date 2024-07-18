"use client";
import {memo} from "react"
import Typewriter from "typewriter-effect"
import type_effect_scss from "../../../../assets/default-pgs-styles/homestyles/title_effect.module.scss"

export default memo(function TypeEffect(){
    const welcome = `<h1 class="text-center fw-bold
    text-warning ${type_effect_scss.homePageWelcomeStyle} font-family-codeapp" >Welcome To CodeApp.com</h1>`
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