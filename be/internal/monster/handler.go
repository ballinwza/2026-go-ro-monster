package monster

import (
	"math"
	"net/http"
	"strconv"

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
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}

	ctx := c.Request.Context()
	monsters, total, err := h.service.GetAll(ctx, page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data":   monsters,
		"pagination": gin.H{
			"total":       total,
			"currentPage": page,
			"perPage":     limit,
			"totalPage":   math.Ceil(float64(total) / float64(limit)),
		},
	})
}
