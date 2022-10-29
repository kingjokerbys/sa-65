import { UserInterface } from "./IUser";  
import { BookingInterface } from "./IBooking";
import { DepartmentInterface } from "./IDepartment";
import { DoctorsInterface } from "./IDoctor";
import { LocationInterface } from "./ILocation";
import { ScheduleInterface } from "./ISchedule";

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

  ScheduleID:  number,
  Schedule:    ScheduleInterface,
}