import React, { useEffect, useState } from "react";
import {Link as RouterLink } from "react-router-dom";
// import {makeStyles, Theme,createStyles,} from "@mui/material/styles";
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { PatientInterface } from "../models/IPatient";
import { TendernessInterface } from "../models/ITenderness";
import { DepartmentInterface } from "../models/IDepartment";
import { SymptomSystemInterface } from "../models/ISymptomSystem";
import { UserInterface } from "../models/IUser";
import { FormHelperText, InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SymptomCreate() {
  // const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<UserInterface>(); //map
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const [tenderness, setTenderness] = useState<DepartmentInterface[]>([]);
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [symptoms, setSymptoms] = useState<Partial<SymptomSystemInterface>>({});
  const [explains, setExplain] = useState<String>("");
  


  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof symptoms;
    setSymptoms({
      ...symptoms,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getUsers = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        symptoms.UserID = res.data.ID
        if (res.data) {
            setUsers(res.data);
        } else {
          console.log("else");
        }
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

  const getPatient = async () => {
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getTenderness = async () => {
    fetch(`${apiUrl}/tendernesses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTenderness(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getPatient();
    getTenderness();
    getDepartment();
    getUsers();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        PatientID: convertType(symptoms.PatientID),
        DepartmentID: convertType(symptoms.DepartmentID),
        TendernessID: convertType(symptoms.TendernessID),
        UserID: convertType(symptoms.UserID),
        SymptomTime: selectedDate,        
        Explain:    explains,

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

    fetch(`${apiUrl}/symptomsystems`, requestOptionsPost)
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
    <Container sx={{ marginTop: 2 }} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
        </Alert>
      </Snackbar>
      <Paper sx={{ padding: 2, color: "text.secondary" }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h6"
              variant="h5"
              color="primary"
              gutterBottom
              
            >
              บันทึกอาการ

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3}  sx={{ flexGrow: 1}}>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    disabled
                    value={symptoms.UserID}
                    // label="ชื่อ - นามสกุล"
                    onChange={handleChange}
                    inputProps={{
                    name: "PatientID",
                    }}
                > 
                    <option value={users?.ID} key={users?.ID} >
                    {users?.Name}
                    </option>

                    {/* {patients.map((item: PatientInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Name}
                    </option>
                    ))} */}
                    
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="PatientID">เลือกชื่อผู้ป่วย</InputLabel>
                <Select
                    native
                    value={symptoms.PatientID}
                    label="กรุณาเลือก..."
                    onChange={handleChange}
                    inputProps={{
                    name: "PatientID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {patients.map((item: PatientInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.User.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="TendernessID">เลือกบริเวณที่เจ็บป่วย</InputLabel>
                <Select
                    native
                    value={symptoms.TendernessID}
                    label="กรุณาเลือก..."
                    onChange={handleChange}
                    inputProps={{
                    name: "TendernessID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {tenderness.map((item: TendernessInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="DepartmentID">เลือกแผนกที่ตรวจ</InputLabel>
                <Select
                    native
                    value={symptoms.DepartmentID}
                    label="กรุณาเลือก..."
                    onChange={handleChange}
                    inputProps={{
                    name: "DepartmentID",
                    }}
                >
                    <option aria-label="None" value="">
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="เลือกวันเวลา"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={(new Date('31-12-2022T09:00'))}
                  renderInput={(params) => 
                  <TextField {...params} />}
                />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            
          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
            <TextField
                id="outlined-textarea"
                label="อาการเพิ่มเติม"
                rows={4}
                placeholder=""
                multiline
                onChange={(event) => setExplain(event.target.value)}
            />
           </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/symptomsystems"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SymptomCreate;