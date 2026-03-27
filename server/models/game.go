package models

type GameData struct {
	Title         string `json:"title,omitempty"`
	Username      string `json:"username,omitempty"`
	Credits       int64  `json:"credits,omitempty"`
	CanvasWidth   int64  `json:"canvasWidth,omitempty"`
	CanvasHeight  int64  `json:"canvasHeight,omitempty"`
	GuestsAllowed bool   `json:"guestsAllowed,omitempty"`
}

type UserShipsData struct {
	UserShips []Ship `json:"userShips"`
}
