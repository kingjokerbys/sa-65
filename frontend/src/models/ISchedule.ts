import { DoctorsInterface } from "./IDoctor";
import { LocationInterface } from "./ILocation";
import { DepartmentInterface } from "./IDepartment";
import { RoomInterface } from "./IRoom";
import { UserInterface } from "./IUser";

export interface ScheduleInterface {

    ID: number,
    ScheduleTime:       Date,


    UserID:       number,                                                                           //////////********** */
    User:         UserInterface,                                                    ////////////********** */

    DepartmentID:       number,
    Department:         DepartmentInterface,
    
    DoctorID:           number,
    Doctor:             DoctorsInterface,

    LocationID:         number,
    Location:           LocationInterface,

    RoomID:             number,
    Room:               RoomInterface,
   
   }