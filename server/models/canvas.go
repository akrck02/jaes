package models

type Layer struct {
	Id      string  `json:"_id,omitempty"`
	Name    string  `json:"name,omitempty"`
	Visible bool    `json:"visible,omitempty"`
	Shapes  []Shape `json:"shapes,omitempty"`
}

type Point struct {
	Id string `json:"_id,omitempty"`
	X  int64  `json:"x,omitempty"`
	Y  int64  `json:"y,omitempty"`
}

type Resolution struct {
	Name   string `json:"name,omitempty"`
	Width  int64  `json:"width,omitempty"`
	Height int64  `json:"height,omitempty"`
}

type Shape struct {
	Id          string `json:"_id,omitempty"`
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

type Ship struct {
	Canvas       *Canvas `json:"canvas,omitempty"`
	Id           string  `json:"_id,omitempty"`
	Layers       []Layer `json:"layers,omitempty"`
	UserId       string  `json:"userId,omitempty"`
	Name         string  `json:"name,omitempty"`
	DateCreated  int64   `json:"dateCreated,omitempty"`
	DateModified int64   `json:"dateModified,omitempty"`
}

type Canvas struct {
	Width  int64 `json:"width,omitempty"`
	Height int64 `json:"height,omitempty"`
}
