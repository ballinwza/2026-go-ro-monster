package monster

import (
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/ballinwza/2026-go-ro-monster/be/internal/config"
	"github.com/ballinwza/2026-go-ro-monster/be/internal/middleware"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) MonsterRoutes(router *gin.RouterGroup) {
	cfg := config.LoadConfig()
	monsters := router.Group("/monsters")
	{
		monsters.GET("/", h.GetMonster)
		monsters.GET("/all", h.GetAllMonsters)

		if cfg.Mode == "development" {
			monsters.GET("/scrapping", middleware.OnlyDevGuard(), h.ScrappingMonsters)
		}
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
	name := strings.TrimSpace(c.Query("name"))
	sortBy := MonsterSortField(strings.TrimSpace(c.Query("sortBy")))
	order, _ := strconv.Atoi(c.Query("order"))

	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}

	ctx := c.Request.Context()
	monsters, total, err := h.service.GetAll(ctx, page, limit, &name, &sortBy, &order)
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
