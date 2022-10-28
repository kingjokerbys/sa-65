package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"
)

// POST /title
func CreateTitle(c *gin.Context) {
	var title entity.Title
	if err := c.ShouldBindJSON(&title); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&title).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": title})
}

// GET /title/:id
func GetTitle(c *gin.Context) {
	var title entity.Title

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&title); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "title not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": title})
}

// LIST /titles
func ListTitles(c *gin.Context) {
	var titles []entity.Title
	if err := entity.DB().Raw("SELECT * FROM titles").Find(&titles).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": titles})
}