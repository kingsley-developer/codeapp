"use client"
import { memo} from "react"
import Typewriter from "typewriter-effect"

export default memo(function Title_Dev() {
    const name = `<h3 class="text-center text-white font-family-codeapp">Hello my name is <span class="text-warning">Kingsley</span> Developer.</h3>`
    const work = `<h3 class="text-center text-white font-family-codeapp">I work as a Full Stack Web Developer.</h3>`
    
    return (
        <div className="container-fluid mt-5">
            <Typewriter
        options={{
          strings: [name, work],
          autoStart: true,
          loop: true,
        }}/>
        </div>
    )
})