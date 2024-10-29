import axios from "axios"
import Socket from "./ClientSocket"
export async function asyncRoom(){
    try {
        const getAllRN = await axios.get(`http://localhost:8999/get_all_room_name`)
        const data: validateRoomType = await getAllRN.data
        if (data.check) {
          const a = data.data
          for (let i = 0; i < a.length; i++){
              Socket.emit("create_room", a[i].room_name)
          }
          return null
        }
      }
      // eslint-disable-next-line no-empty
      catch (e: any) {
        return null
      }
      
  }