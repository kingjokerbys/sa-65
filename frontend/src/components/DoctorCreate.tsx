import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { GenderInterface } from "../models/IGender";
import { UserInterface } from "../models/IUser";
import { DepartmentInterface } from "../models/IDepartment";
import { EducationInterface } from "../models/IEducation";
import { DoctorsInterface } from "../models/IDoctor";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DoctorCreate() {
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const [Educations, setEducations] = useState<EducationInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [doctor, setDoctor] = useState<Partial<DoctorsInterface>>({});

  const [name, setName] = useState<String>("");
  const [salary, setSalary] = useState<String>("");
  const [phonenumber, setPhoneNumber] = useState<String>("");
  const [email, setEmail] = useState<String>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(DoctorCreate);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };  


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof doctor;
    setDoctor({
      ...doctor,
      [name]: event.target.value,
    });

  };





  const getDepartment = async () => {
    fetch(`${apiUrl}/departments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDepartments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getEducation = async () => {
    fetch(`${apiUrl}/educations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEducations(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };
  

  

  useEffect(() => {
    getDepartment();
    getEducation();
    getGender();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        Name: name,
        Salary: typeof salary == "string" ? parseInt(salary) : 0,
        PhoneNumber: phonenumber,
        Email: email ,
        DepartmentID: convertType(doctor.DepartmentID),
        EducationID: convertType(doctor.EducationID),
        GenderID: convertType(doctor.GenderID),     
        

    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/doctors`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true)
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true)
          setErrorMessage(res.error)
        }
      });
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ {errorMessage}
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลแพทย์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

        <Grid item xs={6}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="name"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ"   
                onChange={(event) => setName(event.target.value)}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
            <TextField
                id="phonenumber"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณาใส่เบอร์โทรศัพท์"
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
        
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <p>Email</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="Email"

                
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Grid>


          {/* <Grid item xs={6}>
            <p>Password</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Password"
                variant="outlined"
                type="Password"
                size="medium"
                placeholder="Password"

                
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Grid> */}

                   

          <Grid item xs={6} >
            <FormControl fullWidth variant="outlined">
              <p>แผนก</p>
              <Select
                native
                id="DepartmentID"
                
                onChange={handleChange}
                inputProps={{
                  name: "DepartmentID",
                }}
              >
                <option aria-label="None" value="">
                  -
                </option>
                {departments.map((item: DepartmentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={doctor.GenderID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  -
                </option>
                {genders.map((item: GenderInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <p >เงินเดือน</p>
            
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Salary"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="กรุณาใส่เเงินเดือน"
                onChange={(event) => setSalary(event.target.value)}
              />
            </FormControl>
          </Grid>

          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ระดับทางการศึกษา</p>
              <Select
                native
                value={doctor.EducationID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EducationID",
                }}
              >
                <option aria-label="None" value="">
                  -
                </option>
                {Educations.map((item: EducationInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Level}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          

          
          
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/doctors"
              variant="contained"
              size="large"
              color="inherit"
              startIcon={<ArrowBackIosNewIcon />}>
              กลับ
            </Button>
            <Button 
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              size="large"
              color="primary" 
              endIcon={<AddIcon />}>
              บันทึก
          </Button>
           
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DoctorCreate;


