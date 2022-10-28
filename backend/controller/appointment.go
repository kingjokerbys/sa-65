package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/jacker1342/sa-65-example/entity"
)

// POST /appointment
func CreateAppointment(c *gin.Context) {
    
	var appointment entity.Appointment
	var booking entity.Booking
	var department entity.Department
	var doctor entity.Doctor
	var location entity.Location

	

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
    // 9: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.BookingID).First(&booking); tx.RowsAffected == 0 {
	 	c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
	 	return
   }

	// 10: ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	// 11: ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}

    if tx := entity.DB().Where("id = ?", appointment.LocationID).First(&location); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "location not found"})
		return
	}
	// 12: สร้าง Appointment
	ap := entity.Appointment{
		Booking:		booking,             // โยงความสัมพันธ์กับ Entity Patient
		Department:		department,                  // โยงความสัมพันธ์กับ Entity Department
		Doctor:		    doctor,               // โยงความสัมพันธ์กับ Entity Doctor
		Location: 		location, 
		
		
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(ap); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ap).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ap})
}

// GET /Appointment/:id
func GetAppointment(c *gin.Context) {
	var appointment entity.Appointment
	id := c.Param("id")
	if err := entity.DB().Preload("Booking").Preload("Booking.User").Preload("Department").Preload("Doctor").Preload("Location").Raw("SELECT * FROM appointments WHERE id = ?", id).Find(&appointment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// GET /appointments
func ListAppointments(c *gin.Context) {
	var appointments []entity.Appointment
	if err := entity.DB().Preload("Booking").Preload("Booking.User").Preload("Department").Preload("Doctor").Preload("Location").Raw("SELECT * FROM appointments").Find(&appointments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": appointments})
}