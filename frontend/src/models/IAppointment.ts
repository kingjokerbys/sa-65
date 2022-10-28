import { UserInterface } from "./IUser";  
import { BookingInterface } from "./IBooking";
import { DepartmentInterface } from "./IDepartment";
import { DoctorsInterface } from "./IDoctor";
import { LocationInterface } from "./ILocation";

export interface AppointmentInterface {
  ID:           number,

  UserID: number,
  User:   UserInterface,
  
  BookingID:    number,
  Booking:      BookingInterface,

  DepartmentID: number,
  Department:   DepartmentInterface,

  DoctorID:    number,
  Doctor:      DoctorsInterface,
  
  LocationID:  number,
  Location:    LocationInterface,
}