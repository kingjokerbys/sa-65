package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	
	Name				string
	Email				string			`gorm:"uniqeIndex"`
	Tel					string			`gorm:"uniqeIndex"`
	Password			string
	Role				string

	Bookings			[]Booking 			`gorm:"foreignKey:UserID"`
	Patients 			[]Patient 			`gorm:"foreignKey:UserID"`
	SymptomSystems 		[]SymptomSystem 	`gorm:"foreignKey:UserID"`
	Doctors    			[]Doctor 			`gorm:"foreignKey:UserID"`
	Appointments 		[]Appointment 		`gorm:"foreignKey:UserID"`


}

type Department struct{
	gorm.Model
	Name				string
	Engname      		string 

	Doctors    			[]Doctor 			`gorm:"foreignKey:DepartmentID"`
	Symptoms			[]Symptom			`gorm:"foreignKey:DepartmentID"`
	SymptomSystems		[]SymptomSystem 	`gorm:"foreignKey:DepartmentID"`
	Bookings			[]Booking 			`gorm:"foreignKey:DepartmentID"`
	Appointments []Appointment `gorm:"foreignKey:DepartmentID"`

}

type Symptom struct{
	gorm.Model
	SymptomName			string

	DepartmentID		*uint
	Department			Department

	Bookings			[]Booking			`gorm:"foreignKey:SymptomID"`

}

type SymptomSystem struct{
	gorm.Model
	Explain     		string
	SymptomTime 		time.Time

	UserID				*uint
	User				User

	DepartmentID		*uint
	Department			Department

	PatientID			*uint
	Patient				Patient

	TendernessID		*uint
	Tenderness			Tenderness

}


type Title struct {
	gorm.Model
	Name string

	Patients []Patient `gorm:"foreignKey:TitleID"`
}

type Gender struct {
	gorm.Model
	Name string

	Doctors    []Doctor `gorm:"foreignKey:GenderID"`
	Patients []Patient `gorm:"foreignKey:GenderID"`
}

type Blood struct {
	gorm.Model
	Name string

	Patients []Patient `gorm:"foreignKey:BloodID"`
}

type Disease struct {
	gorm.Model
	Name string

	Patients []Patient `gorm:"foreignKey:DiseaseID"`
}

type Tenderness struct {
	gorm.Model
	Name string

	SymptomSystems []SymptomSystem `gorm:"foreignKey:TendernessID"`
}



type Booking struct{
	gorm.Model
	BookingTime			time.Time
	Detail				string

	// PatientID เป็น FK
	UserID			*uint
	User				User
	// DepartmentID เป็น FK
	DepartmentID		*uint
	Department			Department
	// SymptomID เป็น FK
	SymptomID			*uint
	Symptom				Symptom

	Appointments []Appointment `gorm:"foreignKey:BookingID"`


	

}

type Patient struct {
	gorm.Model
	PersonalID   string `gorm:"uniqueIndex" `
	Allergy      string
	Tel          string
	BirthdayTime time.Time

	// DiseaseID ทำหน้าที่เป็น FK
	DiseaseID *uint
	Disease   Disease 
	// BloodID ทำหน้าที่เป็น FK
	BloodID *uint
	Blood   Blood 
	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender 
	// TitleID ทำหน้าที่เป็น FK
	TitleID *uint
	Title   Title 
	// UserID ทำหน้าที่เป็น FK
	UserID *uint
	User   User 


	SymptomSystems 	[]SymptomSystem `gorm:"foreignKey:PatientID"`

}
//////////////////////////////////////////////////////////
type Location struct {
	gorm.Model
	Name string

	Schedules []Schedule `gorm:"foreignKey:LocationID"`
}

type Room struct {
	gorm.Model
	Name string

	Schedules []Schedule `gorm:"foreignKey:RoomID"`
	Appointments []Appointment `gorm:"foreignKey:LocationID"`

}

type Schedule struct {
	gorm.Model
	ScheduleTime time.Time


	// DoctorID เป็น FK
	UserID *uint
	// ข้อมูลของ Doctor เมื่อ join ตาราง
	User User `gorm:"references:id"`

	// DoctorID เป็น FK
	DoctorID *uint
	// ข้อมูลของ Doctor เมื่อ join ตาราง
	Doctor Doctor 

	// LocationID  เป็น FK
	LocationID *uint
	// ข้อมูลของ Location เมื่อ join ตาราง
	Location Location 

	// AuthoritiesID เป็น FK
	RoomID *uint
	// ข้อมูลของ Authorities เมื่อ join ตาราง
	Room Room 

	// AuthoritiesID เป็น FK
	DepartmentID *uint
	// ข้อมูลของ Authorities เมื่อ join ตาราง
	Department Department 
}

type Doctor struct {
	gorm.Model
	Name        string 
  	Email       string  `gorm:"uniqueIndex"`
  	Salary      *uint
  	PhoneNumber string

	UserID		*uint
	User		User

	DepartmentID	*uint
	Department		Department

	EducationID		*uint
	Education		Education

	GenderID		*uint
	Gender			Gender

	Schedules []Schedule `gorm:"foreignKey:DoctorID" `
	Appointments []Appointment `gorm:"foreignKey:DoctorID"`
}

type Education struct {
	gorm.Model
	Level     string 

  //1 Education เป็นเจ้าของได้หลาย Doctor
  Doctors    []Doctor `gorm:"foreignKey:EducationID"`
	
}


type Appointment struct {
	gorm.Model

	UserID *uint // AuthoritieID เป็น FK
	User   User

	BookingID *uint // PatientID เป็น FK
	Booking   Booking

	DepartmentID *uint // DepartmentID เป็น FK
	Department   Department

	DoctorID *uint // DoctorID เป็น FK
	Doctor   Doctor

	LocationID *uint //  LocationID เป็น FK
	Location   Location
}