"use client";
import {memo, useEffect} from "react"
import HomeView from "../HomeComponents/HomeView"
import { useNavigate } from "react-router-dom"

export default memo(function Home() {
  const route = useNavigate()
  const getAccessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")
  console.log(user_id, getAccessToken)
  useEffect(() => {
    async function validate_User() {
       if (getAccessToken && user_id) {
    route(`/dashboard/${Number(user_id)}`)
    return null
  }
  route("/")   
    }
    validate_User()
  }, [])

  return (
    <div>
      <HomeView />
      </div>
  )
})

