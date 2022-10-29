package entity

import (
	//"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&User{}, &Department{}, &Symptom{}, &Booking{},
		&Title{}, &Gender{}, &Blood{}, &Disease{}, &Patient{},
		&Tenderness{}, &SymptomSystem{},
		&Doctor{}, &Location{}, &Room{}, &Schedule{},
		&Appointment{},
	)

	db = database

//////////////////////////////////////////////////////////////////////

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		Name:     	"Jakkrit Chaiwan",
		Email:    	"jackerchaiwan@gmail.com",
		Tel:      	"0610255279",
		Password: 	string(password),
		Role:		"user",
	})

	db.Model(&User{}).Create(&User{
		Name:     	"Wallaya Patisang",
		Email:    	"wallaya.1999@gmail.com",
		Tel: 		"0920000123",
		Password: 	string(password),
		Role:     	"user",
	})

	db.Model(&User{}).Create(&User{
		Name:  "Panadda Srisawat",
		Email: "panadsada@gmail.com",
		Tel: 		"0930000124",
		Password: string(password),
		Role:     "admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Promporn Phinitphong",
		Email:    "promporn@gmail.com",
		Password: string(password),
		Role: 		"admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Thanawat Nitikarun",
		Email:    "thanawat@gmail.com",
		Password: string(password),
		Role:		"admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Ratchapol Piyaman",
		Email:    "ratchapol@gmail.com",
		Password: string(password), 
		Role:     "admin",
	})



	var jakkrit		User
	var wallaya  	User
	var panadda   	User
	var promporn 	User
	var thanawat 	User
	var ratchapol 	User

	db.Raw("SELECT * FROM users WHERE email = ?", "jackerchaiwan@gmail.com").Scan(&jakkrit)
	db.Raw("SELECT * FROM users WHERE email = ?", "wallaya@gmail.com").Scan(&wallaya)
	db.Raw("SELECT * FROM users WHERE email = ?", "panadsada@gmail.com").Scan(&panadda)
	db.Raw("SELECT * FROM users WHERE email = ?", "promporn@gmail.com").Scan(&promporn)
	db.Raw("SELECT * FROM users WHERE email = ?", "thanawat@gmail.com").Scan(&thanawat)
	db.Raw("SELECT * FROM users WHERE email = ?", "ratchapol@gmail.com").Scan(&ratchapol)

	
	//Education Data
	BachelorDegrees := Education{
		Level:  "Bachelor Degrees",
		
	}
	db.Model(&Education{}).Create(&BachelorDegrees)

	MasterDegrees := Education{
		Level:  "Master Degrees",
		
	}
	db.Model(&Education{}).Create(&MasterDegrees)

	DoctorDegrees := Education{
		Level:  "Doctor Degrees",
		
	}
	db.Model(&Education{}).Create(&DoctorDegrees)
	
	//---Department Data
	General := Department{
		Name: "แพทย์ทั่วไป",
	}
	db.Model(&Department{}).Create(&General)

	Orthopedics := Department{
		Name: "แพทย์กระดูก",
	}
	db.Model(&Department{}).Create(&Orthopedics)

	Cardiac := Department{
		Name: "แพทย์หัวใจ",
	}
	db.Model(&Department{}).Create(&Cardiac)

	Gynecologist := Department{
		Name: "สูตินารีแพทย์(ตรวจภายใน)",
	}
	db.Model(&Department{}).Create(&Gynecologist)

	Otolaryngology := Department{
		Name: "แพทย์เฉพาะทางด้าน ตา หู คอ จมูก",
	}
	db.Model(&Department{}).Create(&Otolaryngology)

	Psychology := Department{
		Name: "จิตเวช",
	}
	db.Model(&Department{}).Create(&Psychology)

	Skin := Department{
		Name: "แพทย์ผิวหนัง",
	}
	db.Model(&Department{}).Create(&Skin)


	//---Symptom Data
	General01 := Symptom{
		SymptomName: "ไข้หวัด",
		Department: General,
	}
	db.Model(&Symptom{}).Create(&General01)

	General02 := Symptom{
		SymptomName: "ตรวจโรคทั่วไป",
		Department: General,
	}
	db.Model(&Symptom{}).Create(&General02)
	/////////////////////////////////////////////////////////

	Orthopedics01 := Symptom{
		SymptomName: "โรคข้อและกระดูก",
		Department: Orthopedics,
	}
	db.Model(&Symptom{}).Create(&Orthopedics01)

	Orthopedics02 := Symptom{
		SymptomName: "หมอนรองกระดูกทับเส้นประสาท",
		Department: Orthopedics,
	}
	db.Model(&Symptom{}).Create(&Orthopedics02)

	Orthopedics03 := Symptom{
		SymptomName: "โรคกระดูกพรุน",
		Department: Orthopedics,
	}
	db.Model(&Symptom{}).Create(&Orthopedics03)

	Orthopedics04 := Symptom{
		SymptomName: "โรคกระดูกเสื่อม",
		Department: Orthopedics,
	}
	db.Model(&Symptom{}).Create(&Orthopedics04)
	/////////////////////////////////////////////////////////

	Cardiac01 := Symptom{
		SymptomName: "โรคหลอดเลือดหัวใจ",
		Department: Cardiac,
	}
	db.Model(&Symptom{}).Create(&Cardiac01)

	Cardiac02 := Symptom{
		SymptomName: "โรคกล้ามเนื้อหัวใจ",
		Department: Cardiac,
	}
	db.Model(&Symptom{}).Create(&Cardiac02)

	Cardiac03 := Symptom{
		SymptomName: "โรคลิ้นหัวใจพิการจากไข้รูห์มาติก",
		Department: Cardiac,
	}
	db.Model(&Symptom{}).Create(&Cardiac03)

	Cardiac04 := Symptom{
		SymptomName: "โรคลิ้นหัวใจอักเสบจาการติดเชื้อ",
		Department: Cardiac,
	}
	db.Model(&Symptom{}).Create(&Cardiac04)

	Cardiac05 := Symptom{
		SymptomName: "โรคหรือความความผิดปรกติที่เกี่ยวข้องกับหัวใจ",
		Department: Cardiac,
	}
	db.Model(&Symptom{}).Create(&Cardiac05)
	/////////////////////////////////////////////////////////

	Gynecologist01 := Symptom{
		SymptomName: "โรคและความผิดปรกติภายใน",
		Department: Gynecologist,
	}
	db.Model(&Symptom{}).Create(&Gynecologist01)
	/////////////////////////////////////////////////////////

	Otolaryngology01 := Symptom{
		SymptomName: "โรคและความผิดปรกติเกี่ยวกับ (หู/ตา/จมูก)",
		Department: Otolaryngology,
	}
	db.Model(&Symptom{}).Create(&Otolaryngology01)

	Otolaryngology02 := Symptom{
		SymptomName: "โรคและความผิดปรกติเกี่ยวกับ (ตา)",
		Department: Otolaryngology,
	}
	db.Model(&Symptom{}).Create(&Otolaryngology02)

	Otolaryngology03 := Symptom{
		SymptomName: "โรคและความผิดปรกติเกี่ยวกับ (จมูก)",
		Department: Otolaryngology,
	}
	db.Model(&Symptom{}).Create(&Otolaryngology03)
	///////////////////////////////////////////////////////

	Psychology01 := Symptom{
		SymptomName: "โรคซึมเศร้า",
		Department: Psychology,
	}
	db.Model(&Symptom{}).Create(&Psychology01)

	Psychology02 := Symptom{
		SymptomName: "โรคจิตเภท",
		Department: Psychology,
	}
	db.Model(&Symptom{}).Create(&Psychology02)

	Psychology03 := Symptom{
		SymptomName: "โรคสมองเสื่อม",
		Department: Psychology,
	}
	db.Model(&Symptom{}).Create(&Psychology03)

	Psychology04 := Symptom{
		SymptomName: "โรคเกี่ยวกับอาการทางจิต",
		Department: Psychology,
	}
	db.Model(&Symptom{}).Create(&Psychology04)
	/////////////////////////////////////////////////////////

	Skin01 := Symptom{
		SymptomName: "โรคและความผิดปรกติเกี่ยวกับผิวหนัง",
		Department: Skin,
	}
	db.Model(&Symptom{}).Create(&Skin01)

	Skin02 := Symptom{
		SymptomName: "โรคผิวหนังในเด็ก",
		Department: Skin,
	}
	db.Model(&Symptom{}).Create(&Skin02)
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	

	// --- Title Data
	mr := Title{
		Name: "นาย",
	}
	db.Model(&Title{}).Create(&mr)

	miss := Title{
		Name: "นางสาว",
	}
	db.Model(&Title{}).Create(&miss)

	mrs := Title{
		Name: "นาง",
	}
	db.Model(&Title{}).Create(&mrs)

	// GENDER Data
	male := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)

	// Blood Data
	a := Blood{
		Name: "A",
	}
	db.Model(&Blood{}).Create(&a)

	b := Blood{
		Name: "B",
	}
	db.Model(&Blood{}).Create(&b)

	ab := Blood{
		Name: "AB",
	}
	db.Model(&Blood{}).Create(&ab)

	o := Blood{
		Name: "O",
	}
	db.Model(&Blood{}).Create(&o)

	// disease Data
	diabetes := Disease{
		Name: "เบาหวาน",
	}
	db.Model(&Disease{}).Create(&diabetes)

	hypertension := Disease{
		Name: "ความดันโลหิตสูง",
	}
	db.Model(&Disease{}).Create(&hypertension)

	tuberculosis := Disease{
		Name: " วัณโรค",
	}
	db.Model(&Disease{}).Create(&tuberculosis)

	none := Disease{
		Name: " ไม่มี",
	}
	db.Model(&Disease{}).Create(&none)
	////////////////////////////////////////////////////////////////////////////////////////


	//---Tenderness
	Head := Tenderness{
		Name: "ศีรษะ",
	}
	db.Model(&Tenderness{}).Create(&Head)

	Neck := Tenderness{
		Name: "คอ",
	}
	db.Model(&Tenderness{}).Create(&Neck)

	Ears := Tenderness{
		Name: "หู",
	}
	db.Model(&Tenderness{}).Create(&Ears)

	Eyes := Tenderness{
		Name: "ตา",
	}
	db.Model(&Tenderness{}).Create(&Eyes)

	Nose := Tenderness{
		Name: "จมูก",
	}
	db.Model(&Tenderness{}).Create(&Nose)

	Mouth := Tenderness{
		Name: "ปาก",
	}
	db.Model(&Tenderness{}).Create(&Mouth)

	Back := Tenderness{
		Name: "หลัง",
	}
	db.Model(&Tenderness{}).Create(&Back)

	Thorax := Tenderness{
		Name: "อก",
	}
	db.Model(&Tenderness{}).Create(&Thorax)

	Abdomen := Tenderness{
		Name: "ท้อง",
	}
	db.Model(&Tenderness{}).Create(&Abdomen)

	Pelvis := Tenderness{
		Name: "เชิงกร้าน",
	}
	db.Model(&Tenderness{}).Create(&Pelvis)

	hand := Tenderness{
		Name: "มือ",
	}
	db.Model(&Tenderness{}).Create(&hand)

	muscle := Tenderness{
		Name: "กล้ามเนื้อ",
	}
	db.Model(&Tenderness{}).Create(&muscle)

	skeleton := Tenderness{
		Name: "กระดูก",
	}
	db.Model(&Tenderness{}).Create(&skeleton)

	hip := Tenderness{
		Name: "สะโพก",
	}
	db.Model(&Tenderness{}).Create(&hip)

	knee := Tenderness{
		Name: "เข่า",
	}
	db.Model(&Tenderness{}).Create(&knee)

	ankle := Tenderness{
		Name: "ข้อเท้า",
	}
	db.Model(&Tenderness{}).Create(&ankle)
	////////////////////////////////////////////////////////////////////////////////////////


	//---Location Data
	A := Location{
		Name: "Building A",
	}
	db.Model(&Location{}).Create(&A)

	B := Location{
		Name: "Building B",
	}
	db.Model(&Location{}).Create(&B)

	//---Room A Data
	A1 := Room{
		Name: "A101",
	}
	db.Model(&Room{}).Create(&A1)

	A2 := Room{
		Name: "A102",
	}
	db.Model(&Room{}).Create(&A2)

	A3 := Room{
		Name: "A103",
	}
	db.Model(&Room{}).Create(&A3)

	B1 := Room{
		Name: "B101",
	}
	db.Model(&Room{}).Create(&B1)

	B2 := Room{
		Name: "B102",
	}
	db.Model(&Room{}).Create(&B2)

	B3 := Room{
		Name: "B103",
	}
	db.Model(&Room{}).Create(&B3)
	////////////////////////////////////////////////////////////
	

}
