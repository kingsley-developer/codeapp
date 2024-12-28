import axios from "axios"
import Socket from "./ClientSocket"
export async function asyncRoom(){
  const user_id = localStorage.getItem("user_id")
  const getAccessToken = localStorage.getItem("accessToken")
    try {
      if(user_id && getAccessToken){
        const getAllRN = await axios.get(`http://localhost:8999/get_all_room_name`)
        const data: validateRoomType = await getAllRN.data
        const getAllJRN = await axios.get(`http://localhost:8999/get_joined_rooms_names/?id=${user_id}`)
        const data2: validateRoomType = await getAllJRN.data
        if (data.check) {
          const a = data.data
          for (let i = 0; i < a.length; i++){
              Socket.emit("create_room", a[i].room_name)
          }
          if (data2.check) {
            const a = data2.data
            for (let i = 0; i < a.length; i++){
                Socket.emit("join_room", a[i].room_name)
            }
            return null
          }
          else{
            return null
          }
        }
        else{
          return null
        }
      }
      else{
        return null
      }
      }
      // eslint-disable-next-line no-empty
      catch (e: any) {
        return null
      }
      
  }