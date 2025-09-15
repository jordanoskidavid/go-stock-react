package utils

import (
	"net/smtp"
)

func SendEmail(to, subject, body string) error {
	from := "gostockreact@gmail.com"
	password := "koqv wura xlic temy"

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n\n" +
		body

	return smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, password, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))
}
