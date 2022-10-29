import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from "@mui/icons-material/People";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


import Home from "./components/Home";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";

import Bookings from "./components/Bookings";
import BookingCreate from "./components/BookingCreate";

import Patient from "./components/Patient";
import PatientCreate from "./components/PatientCreate";

import Symptom from "./components/Symptom";
import SymptomCreate from "./components/SymptomCreate";

import Schedules from "./components/Schedule";
import ScheduleCreate from "./components/ScheduleCreate";

import Doctors from "./components/Doctors"
import DoctorCreate from "./components/DoctorCreate";
// import DocCreate from "./components/DocCreate";
import DoctorForUser from "./components/DoctorForUser";

import Appointments from "./components/Appointment";
import AppointmentCreate from "./components/AppointmentCreate";

import SignIn from "./components/SignIn";


const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role : 'user'},
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role : 'admin'},
  { name: "การจองคิว", icon: <AddToQueueIcon />, path: "/bookings", role: 'user'},
  { name: "สมาชิก", icon: <PeopleIcon />, path: "/user/create", role: 'user' },
  { name: "ข้อมูลผู้ป่วย", icon: <FolderSharedIcon />, path: "/patients", role: 'user' },
  { name: "ข้อมูลผู้ป่วย", icon: <FolderSharedIcon />, path: "/patients", role: 'admin' },
  { name: "บันทึกอาการ", icon: <AddBoxIcon />, path: "/symptoms" , role: 'admin'},
  { name: "ตารางการทำงานแพทย์", icon: <PendingActionsIcon />, path: "/schedules" , role: 'admin'},       
  { name: "ข้อมูลแพทย์", icon: <AccountCircleIcon />, path: "/doctorforuser", role: 'user' },
  // { name: "ข้อมูลแพทย์", icon: <AccountCircleIcon />, path: "/doctorforuser", role: 'admin' },
  { name: "บันทึกข้อมูลแพทย์", icon: <ManageAccountsIcon />, path: "/doctors", role : 'admin' },
  { name: "การนัดหมายสถานที่", icon: <AddLocationAltIcon />, path: "/appointments", role : 'admin' },



];



function App() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String | null>("");
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => { 
    setOpen(!open);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem('role');
    if (token) {
      setToken(token);
      setRole(role);
    }
  }, []);
  
  if (!token) {
    return <SignIn />;
  }
  
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ระบบขี้นทะเบียนผู้ป่วยโรงพยาบาลมหาวิทยาลัยเทคโนโลยีสุรนารี
                
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map(
                (item, index) => 
                role === item.role && (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ) 
              )}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/create" element={<UserCreate />} />
                <Route path="/patients" element={<Patient />} />
                <Route path="/patient/create" element={<PatientCreate />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/booking/create" element={<BookingCreate />} />
                <Route path="/symptom/create" element={<SymptomCreate />} />
                <Route path="/symptoms" element={<Symptom />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/schedule/create" element={<ScheduleCreate />} />
                <Route path="/doctorforuser" element={<DoctorForUser />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctor/create" element={<DoctorCreate />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointment/create" element={<AppointmentCreate />} />

              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;