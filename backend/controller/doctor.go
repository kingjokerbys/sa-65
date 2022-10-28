package controller

import (
	
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"

	"net/http"
)

// POST /doctors

func CreateDoctor(c *gin.Context) {

	var doctor entity.Doctor
	var department entity.Department
	var education entity.Education
	var gender entity.Gender

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร doctor
	if err := c.ShouldBindJSON(&doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", doctor.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	// 10: ค้นหา education ด้วย id
	if tx := entity.DB().Where("id = ?", doctor.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}

	// 11: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", doctor.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}
	// 12: สร้าง Doctor
	doc := entity.Doctor{
		Name: doctor.Name,
		Salary: doctor.Salary,
		Email: doctor.Email,
		PhoneNumber: doctor.PhoneNumber,
		Department:  		department,             // โยงความสัมพันธ์กับ Entity Department
		Education:    education,        // โยงความสัมพันธ์กับ Entity Education
		Gender:    			gender,               	// โยงความสัมพันธ์กับ Entity Gender
	}


	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(doc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	// 13: บันทึก
	if err := entity.DB().Create(&doc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doc})
}

// GET /doctor/:id
// เพื่อดึงข้อมูล doctor ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetDoctor(c *gin.Context) {
	var doctor entity.Doctor
	id := c.Param("id")
	if err := entity.DB().Preload("Department").Preload("Education").Preload("Gender").Raw("SELECT * FROM doctors WHERE id = ?", id).Find(&doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doctor})
}

// GET /doctors
func ListDoctors(c *gin.Context) {
	var doctors []entity.Doctor
	if err := entity.DB().Preload("Department").Preload("Education").Preload("Gender").Raw("SELECT * FROM doctors").Find(&doctors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": doctors})
}