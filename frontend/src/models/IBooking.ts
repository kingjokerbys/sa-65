import { UserInterface } from "./IUser";
import { DepartmentInterface } from "./IDepartment";
import { SymptomInterface } from "./ISymptom";

export interface BookingInterface {
  ID:           number,
  BookingTime:  Date | null,
  Detail:       string,

  UserID:       number,
  User:         UserInterface,

  DepartmentID: number,
  Department:   DepartmentInterface,
  
  SymptomID:    number,
  Symptom:      SymptomInterface,
}