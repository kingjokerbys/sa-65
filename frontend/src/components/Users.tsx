import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { UserInterface } from "../models/IUser";

import { DataGrid, GridColDef } from "@mui/x-data-grid";


function Users() {

 const [users, setUsers] = React.useState<UserInterface[]>([]);


 const getUsers = async () => {

   const apiUrl = "http://localhost:8080/users";

   const requestOptions = {

     method: "GET",
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },

    //  headers: { "Content-Type": "application/json" },

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


 const columns: GridColDef[] = [

   { field: "ID", headerName: "ID", width: 50 },

   { field: "Email", headerName: "Email", width: 250 },

   { field: "Name", headerName: "Name", width: 300 },

   { field: "Role", headerName: "Status", width: 100 },

 ];


 useEffect(() => {

   getUsers();

 }, []);


 return (

   <div>

     <Container maxWidth="md">

       <Box

         display="flex"

         sx={{

           marginTop: 2,

         }}

       >

         <Box flexGrow={1}>

           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >

             Users

           </Typography>

         </Box>

         <Box>

           <Button

             component={RouterLink}

             to="/user/create"

             variant="contained"

             color="primary"

           >

             Create User

           </Button>

         </Box>

       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>

         <DataGrid

           rows={users}

           getRowId={(row) => row.ID}

           columns={columns}

           pageSize={5}

           rowsPerPageOptions={[5]}

         />

       </div>

     </Container>

   </div>

 );

}


export default Users;