import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AppBar from './components/layout/AppBar';
import Home from './components/home/Dashboard';
import Tours from "./components/tours/Tours";
import Packages from "./components/packages/Packages";
import SignIn from "./components/session/SignIn";
import SignUp from "./components/session/SignUp";
import NotFound404 from "./components/errors/NotFound404";

const theme = createTheme({
  typography: {
    fontFamily: "Urbanist, sans-serif",
  },
  palette: {
    background: {
      default: "#f4f5fa",
    },
    primary: {
      main: "#2C2C54",
    },
    secondary: {
      main: "#a8a8a8",
    },
    success: {
      main: "#10E5A5",
    },
    error: {
      main: "#FF5252",
    },
    warning: {
      main: "#FFC107",
    },
    info: {
      main: "#2196F3",
    },
  }
});

const User = localStorage.getItem("profile");

// Crear un Layout para las rutas con el AppBar (Dashboard)
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppBar />
    {children}
  </>
);

function App() {
  if (User) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Rutas que usan el AppBar */}
            <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
            <Route path="/tours" element={<DashboardLayout><Tours /></DashboardLayout>} />
            <Route path="/packages" element={<DashboardLayout><Packages /></DashboardLayout>} />
            <Route path="*" element={<NotFound404 />} /> {/* Ruta 404 */}
            {/* Ruta sin AppBar (para el SignIn) */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
