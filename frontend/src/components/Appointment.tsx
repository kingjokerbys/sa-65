import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AppointmentInterface } from "../models/IAppointment";
import { format } from 'date-fns'




function Appointments() {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getAppointments = async () => {
    fetch(`${apiUrl}/appointments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setAppointments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => { 
    getAppointments(); 
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 2 }} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              การนัดหมายสถานที่
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/appointment/create"
              variant="contained"
              color="primary"
            >
              การนัดหมายสถานที่
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
          <Table sx={{ marginTop: 2 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="2%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="18%">
                  ชื่อ - นามสกุล
                </TableCell>
                <TableCell align="center" width="10%">
                  แผนก
                </TableCell>
                <TableCell align="center" width="15%">
                  แพทย์
                </TableCell>
                <TableCell align="center" width="20%">
                  ตึก
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((item: AppointmentInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Booking.User.Name}</TableCell>
                  <TableCell align="center">{item.Department.Name}</TableCell>
                  <TableCell align="center">{item.Doctor.Name}</TableCell>
                  <TableCell align="center">{item.Location.Name}</TableCell>
                  
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Appointments;