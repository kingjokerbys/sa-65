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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { UserInterface } from "../models/IUser";
import { DepartmentInterface } from "../models/IDepartment";
import { SymptomInterface } from "../models/ISymptom";
import { BookingInterface } from "../models/IBooking";
import { FormHelperText, InputLabel } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookingCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<UserInterface>();
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomInterface[]>([]);
  const [booking, setBooking] = useState<Partial<BookingInterface>>({});
  const [detail, setDetail] = useState<String>("");
  


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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof booking;
    setBooking({
      ...booking,
      [name]: event.target.value,
    });
    console.log(event.target.value);
    
    // if(name == "SymptomID"){
    //   getDepartment(event.target.value)
    // }
    
  };

  // const handleChange = (
  //   event: SelectChangeEvent<number>
  // ) => {
  //   const name = event.target.name as keyof typeof symptoms;
  //   setSymptoms({
  //     ...symptoms,
  //     [name]: event.target.value,
  //   });
  // };


  const getUsers = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        booking.UserID = res.data.ID
        if (res.data) {
            setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getSymptom = async () => {
    fetch(`${apiUrl}/symptoms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSymptoms(res.data);
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

  // const getDepartment = async (id : String | unknown) => {
  //   fetch(`${apiUrl}/department/symptom/${id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       booking.DepartmentID = res.data.ID
  //       console.log(booking.DepartmentID);
  //       if (res.data) {
  //           setDepartments(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };

  useEffect(() => {
    getUsers();
    getDepartment();
    getSymptom();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        UserID: convertType(booking.UserID),
        DepartmentID: convertType(booking.DepartmentID),
        SymptomID: convertType(booking.SymptomID),
        BookingTime: selectedDate,        
        Detail:    detail,

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

    fetch(`${apiUrl}/bookings`, requestOptionsPost)
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
          บันทึกข้อมูลไม่สำเร็จ
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
              บันทึกการจองคิว

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ชื่อ - สกุล</p>
              <Select
                native
                disabled
                value={booking.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option value={users?.ID} key={users?.ID} >
                    {users?.Name}
                    </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>เบอร์โทรศัพท์</p>
              <Select
                native
                disabled
                value={booking.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option value={users?.ID} key={users?.ID} >
                    {users?.Tel}
                    </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกอาการป่วย</p>
              <Select
                native
                value={booking.SymptomID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "SymptomID",
                }}
              >
                {/* <option aria-label="None" value="">
                  กรุณาเลือกเลือกอาการป่วย
                </option> */}
                {symptoms.map((item: SymptomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.SymptomName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกแผนกทางการแพทย์</p>
              <Select
                native
                value={booking.DepartmentID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DepartmentID",
                }}
                
              >
                
                {departments.map((item: DepartmentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="DepartmentID">เลือกแผนกทางการแพทย์</InputLabel>
                <Select
                    native
                    labelId="SymptomID"
                    value={booking.DepartmentID + ""}
                    // label="เลือกแผนกทางการแพทย์"
                    onChange={handleChange}
                    // inputProps={{
                    // name: "DepartmentID",
                    // }}
                    renderValue={(value) =>`${value}`}
                >
                    <option value={departments?.ID} key={departments?.ID}>
                    {departments?.Name}
                    </option>
                </Select>
                </FormControl>
            </Grid> */}
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                 value={selectedDate}
                 onChange={(newValue) => setSelectedDate(newValue)}
                 minDate={(new Date('31-12-2022T09:00'))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
           <p>ระบุอาการเพิ่มเติม</p>
            <TextField
                id="BookingID"
                label="อาการเพิ่มเติม"
                rows={2}
                placeholder=""
                multiline
                onChange={(event) => setDetail(event.target.value)}
            />
            <FormHelperText error>*ไม่จำเป็นต้องระบุ</FormHelperText>
           </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/bookings"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
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

export default BookingCreate;