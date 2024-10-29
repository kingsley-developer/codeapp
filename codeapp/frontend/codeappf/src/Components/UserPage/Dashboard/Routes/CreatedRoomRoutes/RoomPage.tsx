import {memo} from 'react'

export default memo(function RoomPage() {
    const room_id = localStorage.getItem("roomId")
    return (
    <div className="fs-4 text-white container">RoomPage {room_id}</div>
  )
})
