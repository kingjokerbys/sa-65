import {DepartmentInterface} from "./IDepartment";

export interface SymptomInterface {
    ID:             number,
    SymptomName:     string
    Explain:        string,

    DepartmentID:   number,
    Department:     DepartmentInterface,

    
  }