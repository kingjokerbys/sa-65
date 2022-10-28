package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"
)

// POST /blood
func CreateBlood(c *gin.Context) {
	var blood entity.Blood
	if err := c.ShouldBindJSON(&blood); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&blood).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": blood})
}

// GET /blood/:id
func GetBlood(c *gin.Context) {
	var blood entity.Blood

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blood not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": blood})
}

// LIST /bloods
func ListBloods(c *gin.Context) {
	var bloods []entity.Blood
	if err := entity.DB().Raw("SELECT * FROM bloods").Find(&bloods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bloods})
}