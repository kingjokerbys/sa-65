import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DoctorsInterface } from "../models/IDoctor";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DoctorForUsers() {
 const [doctors, setDoctors] = useState<DoctorsInterface[]>([]);

 const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

 useEffect(() => {
   getDoctors();
 }, []);

 const getDoctors = async () => {
    fetch(`${apiUrl}/doctors`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setDoctors(res.data);
        } else {
          console.log("else");
        }
      });
  };


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
              ข้อมูลแพทย์
            </Typography>
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
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="10%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="15%">
                  แผนก
                </TableCell>
                <TableCell align="center" width="20%">
                  ระดับการศึกษา
                </TableCell>
                <TableCell align="center" width="20%">
                  Email
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((item: DoctorsInterface) => (
                <TableRow key={item.ID}>
                <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{item.Gender.Name}</TableCell>
                  <TableCell align="center">{item.Department.Name}</TableCell>
                  <TableCell align="center">{item.Education.Level}</TableCell>
                  <TableCell align="center">{item.Email}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default DoctorForUsers;