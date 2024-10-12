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

const theme = createTheme({
  typography: {
    fontFamily: "Urbanist, sans-serif",
  },
});

// Crear un Layout para las rutas con el AppBar (Dashboard)
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppBar />
    {children}
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Rutas que usan el AppBar */}
          <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
          <Route path="/tours" element={<DashboardLayout><Tours /></DashboardLayout>} />
          <Route path="/packages" element={<DashboardLayout><Packages /></DashboardLayout>} />

          {/* Ruta sin AppBar (para el SignIn) */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
