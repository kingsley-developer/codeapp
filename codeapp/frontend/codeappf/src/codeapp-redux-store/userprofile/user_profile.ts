import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface userType{
    email?: string
    password?: string
    rooms_created?: string[]
    rooms_created_total_users?: number[]
    roomsjoined?: string[]
}

const user : userType = {
    email: "",
    password: "",
    rooms_created: [""],
    rooms_created_total_users: [0],
    roomsjoined: [""],
}

const userData = {
    user
}


export const userSlice = createSlice({
    name: "userdata",
    initialState: userData,
    reducers: {
        signup:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        created_rooms:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        joined_rooms:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        },
        delete_account:(state, action: PayloadAction<userType>)=>{
            state.user = action.payload
        }
    }
})

export const {signup,
     created_rooms,
    joined_rooms,
delete_account} = userSlice.actions

export default userSlice.reducer