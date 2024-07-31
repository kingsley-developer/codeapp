import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const user : userType | userRoomState | profile_img_type = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    profile_img: "",
    rooms_created: [""],
    rooms_created_total_users: 0,
    rooms_created_count: 0,
    roomsjoined: [""],
    roomsjoined_count: 0
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
        add_profile_img:(state, action: PayloadAction<profile_img_type>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        create_room:(state, action: PayloadAction<userRoomState>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        join_room:(state, action: PayloadAction<userRoomState>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        leave_joined_room:(state, action: PayloadAction<userRoomState>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        leave_all_joined_room:(state, action: PayloadAction<userRoomState>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        delete_created_room:(state, action: PayloadAction<userRoomState>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        delete_all_created_rooms:(state, action: PayloadAction<userRoomState>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
        delete_account:(state, action: PayloadAction<(userType & userRoomState & profile_img_type)>)=>{
             return {
                ...state,
                ...action.payload,
            }
        },
    }
})

export const {
    signup,
    add_profile_img,
    create_room,
    join_room,
    leave_joined_room,
    leave_all_joined_room,
    delete_created_room,
    delete_all_created_rooms,
    delete_account,
} = userSlice.actions

export default userSlice.reducer