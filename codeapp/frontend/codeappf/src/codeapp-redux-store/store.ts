import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userprofile/user_profile"

export const Store = configureStore({
    reducer: {
        userdata: userSlice,
    },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch