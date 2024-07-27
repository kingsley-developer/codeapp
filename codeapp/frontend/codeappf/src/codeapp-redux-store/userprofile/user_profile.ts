import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const user : userType = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rooms_created: [""],
    rooms_created_total_users: 0,
    rooms_created_count: 0,
    roomsjoined: [""],
    roomsjoined_count: 0
}

const userData = {
    user
}

export const userSlice = createSlice({
    name: "userdata",
    initialState: userData,
    reducers: {
        signup: (state, action: PayloadAction<userType>) => {
            state.user = action.payload
        },
        create_room:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        join_room:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        leave_joined_room:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        leave_all_joined_room:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        delete_created_room:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        delete_all_created_rooms:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        delete_account:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        }
    }
})

export const {
    signup,
    create_room,
    join_room,
    leave_joined_room,
    leave_all_joined_room,
    delete_created_room,
    delete_all_created_rooms,
    delete_account
} = userSlice.actions

export default userSlice.reducer