import { DepartmentInterface } from "./IDepartment";
import { GenderInterface } from "./IGender";
import { EducationInterface } from "./IEducation";
import { UserInterface } from "./IUser";



export interface DoctorsInterface {

    ID: number;
    Name: string;
    Email: string;
    PhoneNumber: string;
    Salary: number;

    User: UserInterface;
    UserID: number;
    Department: DepartmentInterface;
    DepartmentID:  number;
    GenderID: number;
    Gender: GenderInterface;
    EducationID: number;
    Education: EducationInterface;
   }