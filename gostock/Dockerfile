FROM golang:1.24-alpine

RUN apk add --no-cache git
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

