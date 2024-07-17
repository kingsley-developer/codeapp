"use client"
import {memo} from "react"
import { gallery} from "../../../../assets/imgs-paths-imports/file_imgs"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
}

export default memo(function ImgGallery() {
  return (
    <div className="img-gallery-container container-fluid mt-5">
      <Slide autoplay={true}>
        {gallery.map((slideImg, index) => (
          <div key={index}>
            <div style={{ ...divStyle, "backgroundImage": `url(${slideImg.url})` }}>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  )
})

