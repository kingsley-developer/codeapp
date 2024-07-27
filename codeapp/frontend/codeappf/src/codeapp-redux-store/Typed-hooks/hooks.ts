import {useDispatch, useSelector} from "react-redux"
import type {RootState, AppDispatch} from "../store"

export const useAppDis = useDispatch.withTypes<AppDispatch>()
export const useAppSel = useSelector.withTypes<RootState>()