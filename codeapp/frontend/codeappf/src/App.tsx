import HomeHeader1 from "./Components/DefaultPage/Layouts/HomeHeader1"
import Home from "./Components/DefaultPage/Routes/Home"
import About from "./Components/DefaultPage/Routes/About"
import ContactUs from "./Components/DefaultPage/Routes/ContactUs"
import PrivacyPolicy from "./Components/DefaultPage/Routes/PrivacyPolicy"
import {createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomeHeader1/>}>
      <Route index element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="privacypolicy" element={<PrivacyPolicy/>}/>
      <Route path="contactus" element={<ContactUs/>}/>
      </Route>
    </Route>
))

export default function App() {
  return (
  <div>
    <RouterProvider router={router}/>
  </div>
  )
}

