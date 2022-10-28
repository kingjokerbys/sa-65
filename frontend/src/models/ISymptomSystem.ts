import {PatientInterface} from "./IPatient";
import {UserInterface} from "./IUser";
import {TendernessInterface} from "./ITenderness";
import {DepartmentInterface} from "./IDepartment";

export interface SymptomSystemInterface {
    ID:             number,
    SymptomTime:     Date | null,
    Explain:        string,

    UserID:         number,
    User:           UserInterface,

    DepartmentID:   number,
    Department:     DepartmentInterface,

    PatientID:      number,
    Patient:        PatientInterface,

    TendernessID:   number,
    Tenderness:     TendernessInterface,
  }