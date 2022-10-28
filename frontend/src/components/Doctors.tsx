import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DoctorsInterface } from "../models/IDoctor";
import moment from "moment";




function Doctors() {
 const [doctors, setDoctors] = useState<DoctorsInterface[]>([]);

 const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };



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

  useEffect(() => {
    getDoctors();
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
              ข้อมูลแพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/doctor/create"
              variant="contained"
              color="primary"
            >
              เพิ่มข้อมูล
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
                <TableCell align="center" width="15%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="5%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="20%">
                  แผนก
                </TableCell>
                <TableCell align="center" width="13%">
                  ระดับการศึกษา
                </TableCell>
                <TableCell align="center" width="5%">
                  Email
                </TableCell>
                <TableCell align="center" width="20%">
                  เบอร์โทรศัพท์
                </TableCell>
                <TableCell align="center" width="20%">
                  เงินเดือน
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
                  <TableCell align="center">{item.PhoneNumber}</TableCell>
                  <TableCell align="center">{item.Salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Doctors;


//  const columns: GridColDef[] = [
//    { field: "ID", headerName: "ลำดับ", width: 50 },


//    {
//      field: "Name",
//      headerName: "ชื่อ - นามสกุล",
//      width: 200,
//      editable: true,
     
//      valueFormatter: (params) => params.value.Name,
//    },
//    {
//      field: "Gender",
//      headerName: "เพศ",
//      width: 70,
//      editable: true,
//      valueFormatter: (params) => params.value.Gender.Name,
//    },
//    {
//      field: "Department",
//      headerName: "แผนก",
//      width: 100,
//      editable: true,
//      valueFormatter: (params) => params.value.Name,
//    },
//    {
//      field: "Education",
//      headerName: "ระดับการศึกษา",
//      width: 100,
//      editable: true,
//      valueFormatter: (params) => params.value.Level,
//    },

//    {
//      field: "Email",
//      headerName: "อีเมล์",
//      width: 150,
//      editable: true,
//      valueFormatter: (params) => params.value.Email,
//    },

//    {
//      field: "PhoneNumber",
//      headerName: "เบอร์โทรติดต่อ",
//      width: 150,
//      editable: true,
     
//    },

//    {
//      field: "Salary",
//      headerName: "เงินเดือน",
//      width: 100,
//      editable: true,
     
//    },
   
//  ];

//  return (
//    <div>
//      <Container maxWidth="md">
//        <Box
//          display="flex"
//          sx={{
//            marginTop: 2,
//          }}
//        >
//          <Box flexGrow={1}>
//            <Typography
//              component="h2"
//              variant="h6"
//              color="primary"
//              gutterBottom
//            >
//              ข้อมูลแพทย์
//            </Typography>
//          </Box>

//          <Box>
//             <Button
//              component={RouterLink}
//              to="/doctor/create"
//              variant="contained"
//              color="primary"
//            >
//              เพิ่มข้อมูล
//            </Button>
//           </Box>

//        </Box>
//        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
//          <DataGrid
//            rows={doctors}
//            getRowId={(row) => row.ID}
           
//            columns={columns}
           
//            pageSize={100}
//            rowsPerPageOptions={[10]}
//            disableSelectionOnClick
//            experimentalFeatures={{ newEditingApi: true }}
//          />
//        </div>
//      </Container>
//    </div>
//  );
// }

// export default Doctors;