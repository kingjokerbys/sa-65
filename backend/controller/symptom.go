package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"
)

// POST /symptom
func CreateSymptom(c *gin.Context) {
	var symptom entity.Symptom
	if err := c.ShouldBindJSON(&symptom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&symptom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": symptom})
}

// GET /symptom/:id
func GetSymptom(c *gin.Context) {
	var symptom entity.Symptom

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&symptom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptom})
}

// LIST /symptoms
func ListSymptoms(c *gin.Context) {
	var symptoms []entity.Symptom
	if err := entity.DB().Raw("SELECT * FROM symptoms").Find(&symptoms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptoms})
}