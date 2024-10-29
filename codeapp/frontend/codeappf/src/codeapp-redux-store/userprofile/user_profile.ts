import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const user : userType | userRoomDetails | userForeverApp= {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    roomname: "",
    room_des: "",
    room_tag: "",
    room_visible: false,
    roomsjoined: [""],
    rooms_created_total_users: 0,
    rooms_created_count: 0,
    roomsjoined_count: 0,
    rooms_created: [""],
    user_id: 0,
    first_name: "",
    last_name: "",
    user_name: "",
    user_password: "",
    user_email: "",
}

export const userSlice = createSlice({
    name: "userdata",
    initialState: user,
    reducers: {
        signup: (state, action: PayloadAction<userType>) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        userDataForever: (state, action: PayloadAction<userForeverApp>) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        create_room:(state, action: PayloadAction<userRoomDetails>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        join_room:(state, action: PayloadAction<userRoomDetails>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        leave_joined_room:(state, action: PayloadAction<userRoomDetails>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        leave_all_joined_room:(state, action: PayloadAction<userRoomDetails>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        delete_created_room:(state, action: PayloadAction<userRoomDetails>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        delete_all_created_rooms:(state, action: PayloadAction<userRoomDetails>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        delete_account:(state, action: PayloadAction<(userType & userRoomDetails)>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
    }
})

export const {
    signup,
    create_room,
    userDataForever,
    join_room,
    leave_joined_room,
    leave_all_joined_room,
    delete_created_room,
    delete_all_created_rooms,
    delete_account,
} = userSlice.actions

export default userSlice.reducer