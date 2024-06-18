package main

import (
	"github.com/ethanyanyan/stride-sync/backend/routes"
)

func main() {
	router := routes.SetupRouter()
	router.Run(":8080")
}
