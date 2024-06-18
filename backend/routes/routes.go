package routes

import (
	"github.com/ethanyanyan/stride-sync/backend/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/user", controllers.GetUser)
	return router
}
