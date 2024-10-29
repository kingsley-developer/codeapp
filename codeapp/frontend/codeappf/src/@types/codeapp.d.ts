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

type userForeverApp = {
    user_id: number,
    first_name: string,
    last_name: string,
    user_name: string,
    user_password: string,
    user_email: string,
}

type userRoomDetails = {
    roomname?: string,
    room_des?: string,
    room_tag?: string,
    room_visible?: boolean,
    roomsjoined?: string[],
    rooms_created_total_users?: number
    rooms_created_count?: number,
    roomsjoined_count?: number,
    rooms_created?: string[],
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
        }
    ],
    accesstoken: string,
    msg: string,
    check: boolean
}

type savedUserData = {
    data: [
        {
            user_id: number,
            first_name: string,
            last_name: string,
            user_name: string,
            user_password: string,
            user_email: string,
        }
    ],
    msg: string,
    check: boolean
}

type userRoomData = {
    data: [
        {
           created_room_id: int,
            room_name: string,
            room_des: string,
            room_tag: string,
            room_visibility: boolean,
            room_total_usr: int, 
        }
    ],
    check: boolean
}

type SearchData = {
    created_room_id: int,
     room_name: string,
     room_des: string,
     room_tag: string,
     room_visibility: boolean,
     room_total_usr: int, 
 }

 type itemsType = {
    id: number,
    name: string
}[]
type AddMsgType = {
    check:boolean
}
type AllRoomsData = {
    data: [
        {
           created_room_id: int,
            room_name: string,
            room_des: string,
            room_tag: string,
            room_visibility: boolean,
            room_total_usr: int, 
        }
    ],
    check: boolean
}

type userRoomType = {
    created_room_id: int,
    room_name: string,
    room_des: string,
    room_tag: string,
    room_visibility: boolean,
    room_total_usr: int, 
}

type get_user_signup = {
    check: boolean,
    msg: string
}

type validateRoomType = {
    check: boolean,
    data: [
        {
            room_name: string,
        }
    ]
}

type createRoomType = {
    check: boolean,
    msg: string
}