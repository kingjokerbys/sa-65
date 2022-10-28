import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { PatientInterface } from "../models/IPatient";
import moment from "moment";

function Patients() {
  const [Patients, setPatients] = useState<PatientInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getPatients = async () => {
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getPatients();
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
              การขี้นทะเบียนผู้ป่วย
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/patient/create"
              variant="contained"
              color="primary"
            >
              ขี้นทะเบียน
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
                <TableCell align="center" width="10%">
                  เลขประจำตัวประชาชน
                </TableCell>
                <TableCell align="center" width="10%">
                  คำนำหน้า
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อ - นามสกุล
                </TableCell>
                <TableCell align="center" width="10%">
                  วัน/เดือน/ปีเกิด
                </TableCell>
                <TableCell align="center" width="2%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="6%">
                  หมู่เลือด
                </TableCell>
                <TableCell align="center" width="10%">
                  โรคประจำตัว
                </TableCell>
                <TableCell align="center" width="10%">
                  อาการแพ้ยา แพ้วัคซีน แพ้อาหาร
                </TableCell>
                <TableCell align="center" width="10%">
                  เบอร์โทรศัพท์
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Patients.map((item: PatientInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.PersonalID}</TableCell>
                  <TableCell align="center">{item.Title.Name}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{moment(item.BirthDayTime).format("DD MMMM yyyy")}</TableCell>
                  <TableCell align="center">{item.Gender.Name}</TableCell>
                  <TableCell align="center">{item.Blood.Name}</TableCell>
                  <TableCell align="center">{item.Disease.Name}</TableCell>
                  <TableCell align="center">{item.Allergy}</TableCell>
                  <TableCell align="center">{item.Tel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Patients;