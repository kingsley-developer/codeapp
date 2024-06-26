package mysqldb

// A TABLE FOR CREATED ROOM
func Submit_Created_Room(owner_email string,
	room_created string, total_joined_room string) {
}

// A TABLE FOR JOINED ROOM
func Submit_Joined_Room(joined_user_email string, room_joined string) {

}

// GET TOTAL ROOMS CREATED
func Get_Owner_Created_Rooms(owner_email string) []string {
	return []string{
		"okay_created_rooms",
	}
}

//GET TOTAL ROOMS JOINED
func Get_User_Joined_Rooms(joined_user_email string) []string {
	return []string{
		"okay_joined_rooms",
	}
}
