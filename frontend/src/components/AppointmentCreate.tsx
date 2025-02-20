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
import { DoctorsInterface } from "../models/IDoctor";
import { BookingInterface } from "../models/IBooking";
import { LocationInterface } from "../models/ILocation";
import { ScheduleInterface } from "../models/ISchedule";
import { AppointmentInterface } from "../models/IAppointment";

import { FormHelperText, InputLabel } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AppointmentCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<UserInterface>();
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const [schedules, setSchedules] = useState<ScheduleInterface[]>([]);
  const [booking, setBookings] = useState<BookingInterface[]>([]);
  const [doctors, setDoctors] = useState<DoctorsInterface[]>([]);
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const [appointments, setAppointments] = useState<Partial<AppointmentInterface>>({});
  


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
    const name = event.target.name as keyof typeof appointments;
    setAppointments({
      ...appointments,
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
        appointments.UserID = res.data.ID
        if (res.data) {
            setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getLocation = async () => {
    fetch(`${apiUrl}/locations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setLocations(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getBooking = async () => {
    fetch(`${apiUrl}/bookings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBookings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getSchedule = async () => {
    fetch(`${apiUrl}/schedules`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSchedules(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getDoctor = async () => {
    fetch(`${apiUrl}/doctors`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDoctors(res.data);
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
    getSchedule();
    getDoctor();
    getLocation();
    getBooking();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        UserID: convertType(appointments.UserID),
        DepartmentID: convertType(appointments.DepartmentID),
        ScheduleID: convertType(appointments.ScheduleID),
        DoctorID: convertType(appointments.DoctorID),
        LocationID: convertType(appointments.LocationID),
        BookingID: convertType(appointments.BookingID),

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

    fetch(`${apiUrl}/appointments`, requestOptionsPost)
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
                value={appointments.UserID + ""}
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
            <p>เลือกผู้ป่วย</p>
              <Select
                native
                value={appointments.BookingID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BookingID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {booking.map((item: BookingInterface) => (
                <option value={item.ID} key={item.ID}>
                    {item.User.Name}
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
                value={appointments.ScheduleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ScheduleID",
                }}
                
              >
                <option aria-label="None" value="">
                </option>
                {schedules.map((item: ScheduleInterface) => (
                <option value={item.ID} key={item.ID}>
                    {item.Department.Name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกแพทย์</p>
              <Select
                native
                value={appointments.ScheduleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ScheduleID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {schedules.map((item: ScheduleInterface) => (
                <option value={item.ID} key={item.ID}>
                    {item.Doctor.Name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกแพทย์</p>
              <Select
                native
                value={appointments.ScheduleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ScheduleID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {schedules.map((item: ScheduleInterface) => (
                <option value={item.ID} key={item.ID}>
                    {item.Location.Name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลือกสถานที่</p>
              <Select
                native
                value={appointments.ScheduleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ScheduleID",
                }}
              >
                <option aria-label="None" value="">
                </option>
                {locations.map((item: ScheduleInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Location.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/appointments"
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

export default AppointmentCreate;




// import React, { useEffect, useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import Button from "@mui/material/Button";
// import FormControl from "@mui/material/FormControl";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Snackbar from "@mui/material/Snackbar";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";


// import { BookingInterface } from "../models/IBooking";
// import { DepartmentInterface } from "../models/IDepartment";
// import { UserInterface } from "../models/IUser";
// import { DoctorsInterface } from "../models/IDoctor";
// import { AppointmentInterface } from "../models/IAppointment";
// import { LocationInterface } from "../models/ILocation";


// import { FormHelperText, InputLabel, MenuItem, NativeSelect } from "@material-ui/core";
// import { Autocomplete, Stack } from "@mui/material";
// import { DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { Today } from "@mui/icons-material";

// const Alert = (props: AlertProps) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// };

// function AppointmentCreate() {
//   const [users, setUser] = useState<UserInterface>(); //mapUser
//   const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
//   const [booking, setBookings] = useState<BookingInterface[]>([]);
//   const [doctors, setDoctors] = useState<DoctorsInterface[]>([]);
//   const [locations, setLocations] = useState<LocationInterface[]>([]);
//   const [appointments, setAppointments] = useState<Partial<AppointmentInterface>>({});
  


//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const apiUrl = "http://localhost:8080";
//   const requestOptions = { 
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   };

//     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSuccess(false);
//     setError(false);
//   };

//   const handleChange = (event: SelectChangeEvent) => {
//     const name = event.target.name as keyof typeof appointments;
//     setAppointments({
//       ...appointments,
//       [name]: event.target.value,
//     });
//     console.log(event.target.value);
    
//   };

// //   const getUsers = async () => {
// //     const uid = localStorage.getItem("uid");
// //     fetch(`${apiUrl}/user/${uid}`, requestOptions)
// //       .then((response) => response.json())
// //       .then((res) => {
// //         appointments.UserID = res.data.ID
// //         if (res.data) {
// //             setUser(res.data);
// //         } else {
// //           console.log("else");
// //         }
// //       });
// //   };

//   const getDepartment = async () => {
//     fetch(`${apiUrl}/departments`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setDepartments(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };

//   const getBookings = async () => {
//     fetch(`${apiUrl}/bookings`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setBookings(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };

//   const getDoctor = async () => {
//     fetch(`${apiUrl}/doctors`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setDoctors(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };

//   const getLocation = async () => {
//     fetch(`${apiUrl}/locations`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setLocations(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };

//   useEffect(() => {
//     // getUsers()
//     getLocation()
//     getBookings();
//     getDepartment();
//     getDoctor();
//   }, []);

//   const convertType = (data: string | number | undefined) => {
//     let val = typeof data === "string" ? parseInt(data) : data;
//     return val;
//   };

//   function submit() {
//     let data = {
//         BookingID: convertType(appointments.BookingID),
//         DepartmentID: convertType(appointments.DepartmentID),
//         DoctorID: convertType(appointments.DoctorID),
//         LocationID: convertType(appointments.LocationID),

//     };

//     console.log(data)

//     const requestOptionsPost = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };

//     fetch(`${apiUrl}/appointments`, requestOptionsPost)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           console.log("บันทึกได้")
//           setSuccess(true)
//           setErrorMessage("")
//         } else {
//           console.log("บันทึกไม่ได้")
//           setError(true)
//           setErrorMessage(res.error)
//         }
//       });
//   }

//   return (
//     <Container maxWidth="md">
//       <Snackbar
//         open={success}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleClose} severity="success">
//           บันทึกข้อมูลสำเร็จ
//         </Alert>
//       </Snackbar>
//       <Snackbar
//         open={error}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleClose} severity="error">
//           บันทึกข้อมูลไม่สำเร็จ
//         </Alert>
//       </Snackbar>
//       <Paper>
//         <Box
//           display="flex"
//           sx={{
//             marginTop: 2,
//           }}
//         >
//           <Box sx={{ paddingX: 2, paddingY: 1 }}>
//             <Typography
//               component="h2"
//               variant="h6"
//               color="primary"
//               gutterBottom
//             >
//               บันทึกการจองคิว

//             </Typography>
//           </Box>
//         </Box>
//         <Divider />
//         <Grid container spacing={3} sx={{ padding: 2 }}>

//             <Grid item xs={6}>
//                 <FormControl fullWidth variant="outlined">
//                 <Select
//                     native
//                     disabled
//                     value={appointments.UserID + ""}
//                     // label="ชื่อ - นามสกุล"
//                     onChange={handleChange}
//                     // inputProps={{
//                     // name: "PatientID",
//                     // }}
//                 > 
//                     <option value={users?.ID} key={users?.ID} >
//                     {users?.Name}
//                     </option>
//                     {/* {patients.map((item: PatientInterface) => (
//                     <option value={item.ID} key={item.ID}>
//                         {item.Name}
//                     </option>
//                     ))} */}
                    
//                 </Select>
//                 </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//                 <FormControl fullWidth variant="outlined">
//                 <InputLabel id="BookingID">เลือกผู้ป่วย</InputLabel>
//                 <Select
//                     native
//                     value={appointments.BookingID + ""}
//                     label="เลือกผู้ป่วย"
//                     onChange={handleChange}
//                     inputProps={{
//                     name: "BookingID",
//                     }}
//                 >
//                     <option aria-label="None" value="">
//                     </option>
//                     {booking.map((item: BookingInterface) => (
//                     <option value={item.ID} key={item.ID}>
//                         {item.User.Name}
//                     </option>
//                     ))}
//                 </Select>
//                 </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//                 <FormControl fullWidth variant="outlined">
//                 <InputLabel id="DepartmentID">เลือกแผนกทางการแพทย์</InputLabel>
//                 <Select
//                     native
//                     value={appointments.DepartmentID + ""}
//                     label="เลือกแผนกทางการแพทย์"
//                     onChange={handleChange}
//                     inputProps={{
//                     name: "DepartmentID",
//                     }}
//                 >
//                     <option aria-label="None" value="">
//                     </option>
//                     {departments.map((item: DepartmentInterface) => (
//                     <option value={item.ID} key={item.ID}>
//                         {item.Name}
//                     </option>
//                     ))}
//                 </Select>
//                 </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//                 <FormControl fullWidth variant="outlined">
//                 <InputLabel id="DoctorID">เลือกแพทย์</InputLabel>
//                 <Select
//                     native
//                     value={appointments.DoctorID + ""}
//                     label="เลือกแพทย์"
//                     onChange={handleChange}
//                     inputProps={{
//                     name: "DoctorID",
//                     }}
//                 >
//                     <option aria-label="None" value="">
//                     </option>
//                     {doctors.map((item: DoctorsInterface) => (
//                     <option value={item.ID} key={item.ID}>
//                         {item.Name}
//                     </option>
//                     ))}
//                 </Select>
//                 </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//                 <FormControl fullWidth variant="outlined">
//                 <InputLabel id="LocationID">เลือกตึก</InputLabel>
//                 <Select
//                     native
//                     value={appointments.LocationID + ""}
//                     label="เลือกตึก"
//                     onChange={handleChange}
//                     inputProps={{
//                     name: "LocationID",
//                     }}
//                 >
//                     <option aria-label="None" value="">
//                     </option>
//                     {locations.map((item: LocationInterface) => (
//                     <option value={item.ID} key={item.ID}>
//                         {item.Name}
//                     </option>
//                     ))}
//                 </Select>
//                 </FormControl>
//             </Grid>

//           <Grid item xs={12}>
//             <Button
//               component={RouterLink}
//               to="/appointments"
//               variant="contained"
//               color="inherit"
//             >
//               กลับ
//             </Button>
//             <Button
//               style={{ float: "right" }}
//               onClick={submit}
//               variant="contained"
//               color="primary"
//             >
//               บันทึก
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// }

// export default AppointmentCreate;