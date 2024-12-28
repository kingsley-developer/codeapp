"use client"
import HomeHeader1 from "./Components/DefaultPage/Layouts/HomeHeader1"
import Home from "./Components/DefaultPage/Routes/Home"
import About from "./Components/DefaultPage/Routes/About"
import ContactUs from "./Components/DefaultPage/Routes/ContactUs"
import PrivacyPolicy from "./Components/DefaultPage/Routes/PrivacyPolicy"
import NotFound from "./Components/NOTFOUND/NotFound"
import RightPanel from "./Components/UserPage/Dashboard/RightPanel"
import {memo} from "react"
import Settings from "./Components/UserPage/Dashboard/Routes/Settings"
import Rooms from "./Components/UserPage/Dashboard/Routes/Rooms"
import Notification from "./Components/UserPage/Dashboard/Routes/Notification"
import CreatedRooms from "./Components/UserPage/Dashboard/Routes/CreatedRooms"
import JoinedRooms from "./Components/UserPage/Dashboard/Routes/JoinedRooms"
import Dashboard from "./Components/UserPage/Dashboard/Routes/Dashboard"
import {createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom"
import RoomPage from "./Components/UserPage/Dashboard/Routes/CreatedRoomRoutes/RoomPage"
import {asyncRoom} from "./Preload"
import JoinRoomPage from "./Components/UserPage/Dashboard/Routes/AllRoomRoutes/JoinRoomPage"

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      
      <Route path="/" element={<HomeHeader1/>}>
      <Route index element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="privacypolicy" element={<PrivacyPolicy/>}/>
      <Route path="contactus" element={<ContactUs />}/>
      </Route>
    
    <Route path="dashboard/:userid" element={<RightPanel />} loader={asyncRoom}>
      <Route index element={<Dashboard />} />
      <Route path="notification" element={<Notification />} />
      <Route path="createdrooms" element={<CreatedRooms/>}>
      <Route path=":roomid" element={<RoomPage/>}/>
      </Route>
      <Route path="joinedrooms" element={<JoinedRooms/>}>
      <Route path=":roomid" element={<JoinRoomPage/>}/>
      </Route>
    <Route path="rooms" element={<Rooms/>}/>
    <Route path="settings" element={<Settings/>}/>
    </Route>
    
    <Route path="*" element={<NotFound />} />
    
    </Route>
))

export default memo(function App() {
  return (
  <div>
    <RouterProvider router={router}/>
  </div>
  )
})

