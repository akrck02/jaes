package models

type Ship struct {
	Name   string  `json:"name,omitempty"`
	Layers []Layer `json:"layers,omitempty"`
}
