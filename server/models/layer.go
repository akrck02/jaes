package models

type Layer struct {
	Name    string  `json:"name,omitempty"`
	Visible bool    `json:"visible,omitempty"`
	Shapes  []Shape `json:"shapes,omitempty"`
}
