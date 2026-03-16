package models

type User struct {
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
	Email    string `json:"email,omitempty"`
	Credits  int64  `json:"credits,omitempty"`
	Kills    int64  `json:"kills,omitempty"`
	Death    int64  `json:"death,omitempty"`
}

func (*User) encryptPassword() error {
	return nil
}

func (*User) validPassword() bool {
	return true
}
