import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import { makeStyles, Theme, createStyles } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TitleInterface } from "../models/ITitle";
import { GenderInterface } from "../models/IGender";
import { BloodInterface } from "../models/IBlood";
import { DiseaseInterface } from "../models/IDisease";
import { UserInterface } from "../models/IUser";
import { PatientInterface } from "../models/IPatient";
// import { FormHelperText, InputLabel } from "@mui/material";
// import { tabsListUnstyledClasses } from "@mui/base";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function PatientCreate() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );


  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<UserInterface>(); //map
  const [titles, setTitles] = useState<TitleInterface[]>([]);
  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [bloods, setBloods] = useState<BloodInterface[]>([]);
  const [diseases, setDiseases] = useState<DiseaseInterface[]>([]);
  const [patients, setPatients] = useState<Partial<PatientInterface>>({});
  const [personalID, setPersonalID] = useState<String>("");
  const [allergy, setAllergy] = useState<String>("");
  const [tel, setTel] = useState<String>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  console.log(patients);
  

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
    const name = event.target.name as keyof typeof patients;
    setPatients({
      ...patients,
      [name]: event.target.value,
    });
  };

  // const handleDateChange = (date: Date | null) => {
  //   console.log(date);
  //   setSelectedDate(date);
  // };

  const getUsers = async () => {
    const apiUrl = `http://localhost:8080/user/${localStorage.getItem("uid")}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };
 

  const getTitle = async () => {
    const apiUrl = "http://localhost:8080/titles";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };



    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setTitles(res.data);
        } else {
          console.log("else");
        }
      });
  };


  const getGender = async () => {
    const apiUrl = "http://localhost:8080/genders";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };



    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };


  const getBlood = async () => {
    const apiUrl = "http://localhost:8080/bloods";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setBloods(res.data);
        } else {
          console.log("else");
        }
      });
  };
 

  const getDisease = async () => {
    const apiUrl = "http://localhost:8080/diseases";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };



    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setDiseases(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {

      // UserID: patients?.UserID?? "",
      // TitleID: patients?.TitleID?? "",
      // GenderID: patients?.TitleID?? "",
      // BloodID: patients?.BloodID?? "",
      // DiseasesID: patients?.DiseaseID?? "",
      BirthdayTime: selectedDate,        
      PersonalID:   personalID,
      Allergy:      allergy,
      Tel:          tel,
      // UserID: convertType(patients.UserID),
      UserID: users?.ID,
      TitleID: convertType(patients.TitleID),
      GenderID: convertType(patients.GenderID),
      BloodID: convertType(patients.BloodID),
      DiseaseID: convertType(patients.DiseaseID),
        // BirthdayTime: selectedDate,        
        // personalID:   personalID,
        // Allergy:      allergy,
        // Tel:          tel,

    };

    console.log(data)

    const apiUrl = "http://localhost:8080/patients";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });

  }
  useEffect(() => {
    getUsers();
    getTitle();
    getGender();
    getBlood();
    getDisease();
  }, []);

  return (
    <Container sx={{ marginTop: 2}} maxWidth="md">
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
      <Paper  sx={{ padding: 2, color: "text.secondary" }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h6"
              variant="h5"
              color="primary"
              gutterBottom
              
            >
              บันทึกการขี้นทะเบียนผู้ป่วย

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} justifyContent="center" sx={{ flexGrow: 1 }}>
        <Grid item xs={12}></Grid>
        <Grid item xs={7}>
           <FormControl fullWidth variant="outlined">
            <TextField
                id="PersonalID"
                label="เลขประจำตัวประชาชน"
                value={personalID}
                placeholder=""
                onChange={(event) => setPersonalID(event.target.value)}
            />
           </FormControl>
          </Grid>

          <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    value={patients.TitleID}
                    label="คำนำหน้าชื่อ"
                    onChange={handleChange}
                    inputProps={{
                    name: "TitleID",
                    }}
                >
                    <option value="">
                        เลือกคำนำหน้า
                    </option>

                    {titles.map((item: TitleInterface) => (
                    <option key={item.ID} value={item.ID}>
                        {item.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    disabled
                    value={patients.UserID}
                    // label="ชื่อ - นามสกุล"
                    onChange={handleChange}
                    // inputProps={{
                    // name: "UserID",
                    // }}
                > 
                    <option value={users?.ID} key={users?.ID} >
                    {users?.Name}
                    </option>
                    {/* {users.map((item: userInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Name}
                    </option>
                    ))} */}
                    
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="วัน/เดือน/ปี เกิด"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    value={patients.GenderID}
                    label="เพศ"
                    onChange={handleChange}
                    inputProps={{
                    name: "GenderID",
                    }}
                >
                    <option value="">
                        เลือกเพศ
                    </option>

                    {genders.map((item: GenderInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    value={patients.BloodID}
                    label="หมู่เลือด"
                    onChange={handleChange}
                    inputProps={{
                    name: "BloodID",
                    }}
                >
                    <option value="">
                        เลือกหมู่เลือด
                    </option>

                    {bloods.map((item: BloodInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    value={patients.DiseaseID}
                    label="โรคประจำตัว"
                    onChange={handleChange}
                    inputProps={{
                    name: "DiseaseID",
                    }}
                >
                    <option value="">
                        เลือกโรคประจำตัว
                    </option>

                    {diseases.map((item: DiseaseInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={7}>
           <FormControl fullWidth variant="outlined">
            <TextField
                id="PatientID"
                label="อาการแพ้ยา"
                rows={3}
                placeholder=""
                multiline
                onChange={(event) => setAllergy(event.target.value)}
            />
           </FormControl>
          </Grid>

          <Grid item xs={7}>
           <FormControl fullWidth variant="outlined">
            <TextField
                id="PatientID"
                label="โทรศัพท์"
                rows={1}
                placeholder=""
                multiline
                onChange={(event) => setTel(event.target.value)}
            />
           </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/patients"
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
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PatientCreate;