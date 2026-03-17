package models

type Resolution struct {
	Name   string `json:"name,omitempty"`
	Width  int64  `json:"width,omitempty"`
	Height int64  `json:"height,omitempty"`
}
