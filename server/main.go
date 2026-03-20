package main

import (
	"net/http"

	"github.com/jonbul/jaes/api/controllers"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("../client/public")))
	http.HandleFunc("/game/data", controllers.GetGameData)
	http.HandleFunc("/game/userShips", controllers.GetUserShips)
	http.HandleFunc("/game/getShips", serveShipsFile)

	println("Listening on http://[::1]")
	http.ListenAndServe(":80", nil)

}

func serveShipsFile(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../backup/mongo/jaes.ships.json")
}
