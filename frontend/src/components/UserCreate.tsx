import React from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
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
import { UserInterface } from "../models/IUser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function UserCreate() {
 const [date, setDate] = React.useState<Date | null>(null);
 const [user, setUser] = React.useState<Partial<UserInterface>>({});

 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);


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


 const handleInputChange = (

   event: React.ChangeEvent<{ id?: string; value: any }>

 ) => {

   const id = event.target.id as keyof typeof UserCreate;

   const { value } = event.target;

   setUser({ ...user, [id]: value });

 };


 function submit() {

   let data = {

     Name: user.Name ?? "",

     Email: user.Email ?? "",

     Password: user.Password ?? "",

     Role:  user.Role ?? "user",

   };


   const apiUrl = "http://localhost:8080/users";

   const requestOptions = {

     method: "POST",
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),

    //  headers: { "Content-Type": "application/json" },

    //  body: JSON.stringify(data),

   };


   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       if (res.data) {

         setSuccess(true);

       } else {

         setError(true);
         console.log(res.error);

       }

     });

 }


 return (

   <Container maxWidth="md">

     <Snackbar

       open={success}

       autoHideDuration={6000}

       onClose={handleClose}

       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

     >

       <Alert onClose={handleClose} severity="success">

         บันทึกข้อมูลสำเร็จ

       </Alert>

     </Snackbar>

     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

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

             สร้างบัญชีผู้ใช้

           </Typography>

         </Box>

       </Box>

       <Divider />

       <Grid container spacing={3} sx={{ padding: 2 }}>

         <Grid item xs={6}>

           <p>ชื่อ-สกุล</p>

           <FormControl fullWidth variant="outlined">

             <TextField

               id="Name"

               variant="outlined"

               type="string"

               size="medium"

               value={user.Name || ""}

               onChange={handleInputChange}

             />

           </FormControl>


         </Grid>

         <Grid item xs={12}>

           <FormControl fullWidth variant="outlined">

             <p>Email</p>

             <TextField

               id="Email"

               variant="outlined"

               type="string"

               size="medium"

               value={user.Email || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={12}>

           <FormControl fullWidth variant="outlined">

             <p>รหัสผ่าน</p>

             <TextField

               id="Password"

               variant="outlined"

               type="Password"

               size="medium"

               value={user.Password || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={12}>

           <Button component={RouterLink} to="/" variant="contained">

             Back

           </Button>

           <Button

             style={{ float: "right" }}

             onClick={submit}

             variant="contained"

             color="primary"

           >

             Submit

           </Button>

         </Grid>

       </Grid>

     </Paper>

   </Container>

 );

}


export default UserCreate;