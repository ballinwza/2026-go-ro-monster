package monster

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) MonsterRoutes(router *gin.RouterGroup) {
	monsters := router.Group("/monsters")
	{
		monsters.GET("/", h.GetMonster)
		monsters.GET("/scrapping", h.ScrappingMonsters)
		monsters.GET("/all", h.GetAllMonsters)
	}
}

func (h *Handler) GetMonster(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "list of monster",
	})
}

func (h *Handler) ScrappingMonsters(c *gin.Context) {
	monsters, err := h.service.Scrapping()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data":   monsters,
	})
}

func (h *Handler) GetAllMonsters(c *gin.Context) {
	monsters, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data":   monsters,
	})
}
