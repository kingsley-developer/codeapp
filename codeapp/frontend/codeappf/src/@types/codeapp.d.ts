type imgtype = {
    dev1: string,
    dev2: string,
    dev3: string
}

type galleryImgs = {
    url: string,
    caption: string,
}[]

type sponsor_img_type = {
    s1: string,
    s2: string,
    s4: string,
    s5: string,
    s6: string,
    s7: string,
    s8: string,
    s9: string,
}
type userType = {
    firstname?: string,
    lastname?: string,
    username?: string,
    email?: string,
    password?: string,
}

type userRoomState = {
    rooms_created?: string[],
    rooms_created_total_users?: number,
    rooms_created_count: number,
    roomsjoined?: string[],
    roomsjoined_count: number
}

type profile_img_type = {
    profile_img?: string
}

type signData = {
    data: [
        {
            user_id: number,
            first_name: string,
            last_name: string,
            user_name: string,
            user_password: string,
            user_email: string,
            user_img: string
        }
    ],
    msg: string,
    check: boolean
}

type get_user_signup = {
    check: boolean,
    msg: string
}