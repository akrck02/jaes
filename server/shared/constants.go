package shared

import "github.com/jonbul/jaes/models"

var AVAILABLE_RESOLUTIONS = []models.Resolution{
	{
		Name:   "FullHD (1920x1080)",
		Width:  1920,
		Height: 1080,
	},
	{
		Name:   "2K (2560x1440)",
		Width:  2560,
		Height: 1440,
	},
	{
		Name:   "4K (2560x1440)",
		Width:  3840,
		Height: 2160,
	},
}

type ALLOWED_PLAYER_TYPES int

const (
	ALL_PLAYERS ALLOWED_PLAYER_TYPES = iota
	REGISTERED_PLAYERS
)
