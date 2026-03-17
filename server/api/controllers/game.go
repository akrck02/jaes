package controllers

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/jonbul/jaes/logger"
)

/*
 * /game -> the game itself
 * /game/data -> current game data
 * /game/userShips -> game user available ships
 * /game/status -> monitoring
 * /game/playerTypes -> get player types
 * /game/getShips -> get game ships
 * /game/getPlayers -> get game players
 */

// TODO: Add proper filter
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for testing
	},
}

var connectionCount = 0

func OpenGameSocket(w http.ResponseWriter, r *http.Request) {

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		logger.Fatal(err.Error())
	}

	// Read every message in a new go routine
	go func() {

		connectionCount++
		for {
			messageType, p, err := ws.ReadMessage()
			if err != nil {
				logger.Errorf(err)
				return
			}
			logger.Info(string(p))

			if err := ws.WriteMessage(messageType, p); err != nil {
				logger.Errorf(err)
				return
			}
		}
	}()
}
