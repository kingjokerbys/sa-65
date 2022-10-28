package controller

 

import (

             "github.com/jacker1342/sa-65-example/entity"

           "github.com/gin-gonic/gin"

           "net/http"

)



// POST /Education_level

func CreateEducation(c *gin.Context) {

	var education entity.Education

	if err := c.ShouldBindJSON(&education); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if err := entity.DB().Create(&education).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}

	c.JSON(http.StatusOK, gin.H{"data": education})

}


// GET /Education_level/:id

func GetEducation(c *gin.Context) {

	var education entity.Education

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM educations WHERE id = ?", id).Scan(&education).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": education})

}




// GET /Education_level

func ListEducations(c *gin.Context) {

	var educations []entity.Education

	if err := entity.DB().Raw("SELECT * FROM educations").Scan(&educations).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": educations})

}