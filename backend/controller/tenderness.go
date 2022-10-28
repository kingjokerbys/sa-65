package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"
)

// POST /tenderness
func CreateTenderness(c *gin.Context) {
	var tenderness entity.Tenderness
	if err := c.ShouldBindJSON(&tenderness); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&tenderness).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": tenderness})
}

// GET /tenderness/:id
func GetTenderness(c *gin.Context) {
	var tenderness entity.Tenderness

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&tenderness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tenderness not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tenderness})
}

// LIST /tendernesses
func ListTendernesses(c *gin.Context) {
	var tendernesses []entity.Tenderness
	if err := entity.DB().Raw("SELECT * FROM tendernesses").Find(&tendernesses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tendernesses})
}