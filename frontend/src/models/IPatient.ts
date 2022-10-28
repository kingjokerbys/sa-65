import { UserInterface } from "./IUser";
import { TitleInterface } from "./ITitle";
import { GenderInterface } from "./IGender";
import { BloodInterface } from "./IBlood";
import { DiseaseInterface } from "./IDisease";


export interface PatientInterface {
    ID?:            number;
    BirthDayTime:   Date;
    PersonalID:     string;
	Allergy:        string;
	Tel:            string;

    TitleID:        number;
    Title:          TitleInterface;

    GenderID:       number;
    Gender:         GenderInterface;

    BloodID:        number;
    Blood:          BloodInterface;

    DiseaseID:      number;
    Disease:        DiseaseInterface;
    
    UserID:         number; 
    User:           UserInterface;
}