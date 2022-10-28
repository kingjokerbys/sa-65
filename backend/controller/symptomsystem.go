package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"
)

// POST /symptom
func CreateSymptomSystem(c *gin.Context) {

	var User entity.User
	var Patient entity.Patient
	var Tenderness entity.Tenderness
	var Department entity.Department
	var Symptom entity.SymptomSystem

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร symptom
	if err := c.ShouldBindJSON(&Symptom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", Symptom.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 10: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", Symptom.PatientID).First(&Patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}
	

	// 12: ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", Symptom.DepartmentID).First(&Department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department not found"})
		return
	}

	// 11: ค้นหา tenderness ด้วย id
	if tx := entity.DB().Where("id = ?", Symptom.TendernessID).First(&Tenderness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tenderness not found"})
		return
	}

	// 13: สร้าง Symptom
	st := entity.SymptomSystem{
		User:			User,
		Tenderness:		Tenderness,
		Patient:		Patient,             // โยงความสัมพันธ์กับ Entity Patient
		Department:		Department,                  // โยงความสัมพันธ์กับ Entity Department
		Explain: 		Symptom.Explain,
		SymptomTime:	Symptom.SymptomTime, // ตั้งค่าฟิลด์ SymptomTime
	}

	// // ขั้นตอนการ validate ที่นำมาจาก unit test
	// if _, err := govalidator.ValidateStruct(st); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// 14: บันทึก
	if err := entity.DB().Create(&st).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": st})
}

// GET /symptoms/:id
// เพื่อดึงข้อมูล symptom ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetSymptomSystem(c *gin.Context) {
	var symptom entity.SymptomSystem
	id := c.Param("id")
	if err := entity.DB().Preload("Patient").Preload("Department").Preload("User").Preload("Tenderness").Raw("SELECT * FROM symptomsystems WHERE id = ?", id).Find(&symptom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": symptom})
}
	


// GET /symptoms
// เป็นการ list รายการของ symptoms ออกมา
func ListSymptomSystems(c *gin.Context) {
	var symptoms []entity.SymptomSystem
	if err := entity.DB().Preload("Patient").Preload("Patient.User").Preload("Department").Preload("User").Preload("Tenderness").Raw("SELECT * FROM symptom_systems").Find(&symptoms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptoms})
}

// DELETE /symptoms/:id
// เป็น function สำหรับลบ symptom ด้วย ID
func DeleteSymptomSystem(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM symptomsystems WHERE id = ?", id); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "symptom not found"})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /symptoms

func UpdateSymptomSystem(c *gin.Context) {

	var symptom entity.Symptom
	if err := c.ShouldBindJSON(&symptom); err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	if tx := entity.DB().Where("id = ?", symptom.ID).First(&symptom); tx.RowsAffected == 0 {
		   c.JSON(http.StatusBadRequest, gin.H{"error": "symptom not found"})
		   return
	}
	if err := entity.DB().Save(&symptom).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": symptom})
}