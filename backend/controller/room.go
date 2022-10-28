package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"

	"net/http"
)

// POST /rooms

func CreateRoom(c *gin.Context) {

	var room entity.Room
	if err := c.ShouldBindJSON(&room); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&room).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /room/:id
// เพื่อดึงข้อมูล room ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetRoom(c *gin.Context) {

	var room entity.Room
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})

}


// GET /rooms
// เป็นการ list รายการของ Rooms ออกมา
func ListRooms(c *gin.Context) {

	var rooms []entity.Room

	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})

}