package models

type Shape struct {
	Name        string `json:"name,omitempty"`
	Description string `json:"desc,omitempty"`

	X int64 `json:"x,omitempty"`
	Y int64 `json:"y,omitempty"`

	Width  int64 `json:"width,omitempty"`
	Height int64 `json:"height,omitempty"`

	Rotation int     `json:"rotation,omitempty"`
	Points   []Point `json:"points,omitempty"`

	Radius  int64 `json:"radius,omitempty"`
	RadiusX int64 `json:"radiusX,omitempty"`
	RadiusY int64 `json:"radiusY,omitempty"`

	StartAngle int64 `json:"startAngle,omitempty"`
	EndAngle   int64 `json:"endAngle,omitempty"`

	BackgroundColor string `json:"backgroundColor,omitempty"`

	BorderColor string `json:"borderColor,omitempty"`
	BorderWidth int64  `json:"borderWidth,omitempty"`

	Src       string `json:"src,omitempty"`
	Mirror    bool   `json:"mirror,omitempty"`
	ProjectId int64  `json:"projectId,omitempty"`
}
