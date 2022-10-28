package main

import (
	"github.com/jacker1342/sa-65-example/controller"
	"github.com/jacker1342/sa-65-example/entity"
	"github.com/jacker1342/sa-65-example/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Patient Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Department Routes
			protected.GET("/departments", controller.ListDepartments)
			protected.GET("/department/:id", controller.GetDepartment)
			protected.GET("/department/symptom/:id", controller.GetDepartmentBySymptomID)
			protected.POST("/departments", controller.CreateDepartment)
			protected.PATCH("/departments", controller.UpdateDepartment)
			protected.DELETE("/departments/:id", controller.DeleteDepartment)

			// Symptom Routes
			protected.GET("/symptoms", controller.ListSymptoms)
			protected.GET("/symptom/:id", controller.GetSymptom)
			protected.POST("/symptoms", controller.CreateSymptom)
			// protected.PATCH("/symptoms", controller.UpdateSymptom)
			// protected.DELETE("/symptoms/:id", controller.DeleteSymptom)

			// Booking Routes
			protected.GET("/bookings", controller.ListBookings)
			protected.GET("/booking/:id", controller.GetBooking)
			protected.POST("/bookings", controller.CreateBooking)
			protected.PATCH("/bookings", controller.UpdateBooking)
			protected.DELETE("/bookings/:id", controller.DeleteBooking)


			// Title Routes
			protected.GET("/titles", controller.ListTitles)
			// Gender Routes
			protected.GET("/genders", controller.ListGenders)
			protected.GET("/gender/:id", controller.GetGender)
			protected.POST("/genders", controller.CreateGender)

			// Blood  Routes
			protected.GET("/bloods", controller.ListBloods)
			// Disease  Routes
			protected.GET("/diseases", controller.ListDiseases)
			// Patient  Routes
			protected.GET("/patients", controller.ListPatients)
			protected.POST("/patients", controller.CreatePatient)


			
			// Tenderness Routes
			protected.GET("/tendernesses", controller.ListTendernesses)
			protected.POST("/tendernesses", controller.CreateTenderness)
			protected.GET("/tenderness/:id", controller.GetTenderness)
			// Symptom Routes
			
			protected.GET("/symptomsystems", controller.ListSymptomSystems)
			protected.GET("/symptomsystem/:id", controller.GetSymptomSystem)
			protected.POST("/symptomsystems", controller.CreateSymptomSystem)



			// doctor Routes
			protected.GET("/doctors", controller.ListDoctors)
			protected.GET("/doctor/:id", controller.GetDoctor)
			protected.POST("/doctors", controller.CreateDoctor)
			

			// Education_level Routes

			protected.GET("/educations", controller.ListEducations)
			protected.GET("/education/:id", controller.GetEducation)
			protected.POST("/educations", controller.CreateEducation)


			// location Routes
			protected.GET("/locations", controller.ListLocations)
			protected.GET("/location/:id", controller.GetLocation)
			protected.POST("/locations", controller.CreateLocation)

			// room Routes
			protected.GET("/rooms", controller.ListRooms)
			protected.GET("/room/:id", controller.GetRoom)
			protected.POST("/rooms", controller.CreateRoom)

			// schedule Routes
			protected.GET("/schedules", controller.ListSchedules)
			protected.GET("/schedule/:id", controller.GetSchedule)
			protected.POST("/schedules", controller.CreateSchedule)


			// Appointment Routes
			protected.GET("/appointments", controller.ListAppointments)
			protected.GET("/appointment/:id", controller.GetAppointment)
			protected.POST("/appointments", controller.CreateAppointment)
		}
	}

	// users Routes
	r.POST("/users", controller.CreateUser)	

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}