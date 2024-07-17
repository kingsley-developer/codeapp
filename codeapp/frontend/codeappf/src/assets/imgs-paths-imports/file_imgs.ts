import dev1 from "../dev-images/group-portrait-of-confident-male-and-female-computer-programmers-standing-together-in-office-MASF01778.jpg"
import dev2 from "../dev-images/improve-software-development-team-main.jpg"
import dev3 from "../dev-images/1000_F_168687622_ZGqaLbnDpDKxueNIYH5pYkuwPLbAToYt.jpg"

import g1 from "../gallery-imgs/1.jpg"
import g2 from "../gallery-imgs/2.jpg"
import g3 from "../gallery-imgs/3.jpg"
import g4 from "../gallery-imgs/4.jpg"
import g5 from "../gallery-imgs/5.jpg"
import g6 from "../gallery-imgs/6.jpg"
import g7 from "../gallery-imgs/7.jpg"
import g8 from "../gallery-imgs/8.jpg"

import s1 from "../our-sponsors/download (1).png"
import s2 from "../our-sponsors/download (2).png"
import s4 from "../our-sponsors/download (4).png"
import s5 from "../our-sponsors/download (5).png"
import s6 from "../our-sponsors/download (6).png"
import s7 from "../our-sponsors/download (7).png"
import s8 from "../our-sponsors/download8.jpg"
import s9 from "../our-sponsors/download.png"
import kinsley_pic from "../developers-kingsley/1695464818225.jpg"

const devimgs: imgtype = {
    dev1,
    dev2,
    dev3
}

const sponsor_img: sponsor_img_type = {
    s1,
    s2,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9
}

const gallery: galleryImgs = [
    {url: g1,caption: "slide1",
    },
    {url: g2,caption: "slide2",
    },
    {url: g3,caption: "slide3",
    },
    {url: g4, caption:"slide4",
    },
    {url: g5,caption: "slide5",
    },
    {url: g6,caption: "slide6",
    },
    {url: g7,caption: "slide7",
    },
    {url: g8,caption: "slide8",
    },
]

export {devimgs, gallery, sponsor_img, kinsley_pic}