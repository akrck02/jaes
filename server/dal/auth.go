package dal

import "github.com/jonbul/jaes/models"

func RegisterUser(*models.User) error {
	return nil
}

func LoginByName(username string, password string) error {
	return nil
}

func LoginByMail(mail string, password string) error {
	return nil
}

func GetUserByEmail(email string) (*models.User, error) {
	return nil, nil
}

func GetUserByName(name string) (*models.User, error) {
	return nil, nil
}
