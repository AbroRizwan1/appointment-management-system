import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import Appointment from "../src/Pages/Landingpage/Appointment";
import Login from "./Pages/Landingpage/Login";
import Landing from "./Layout/Landing";
import Errorpage from "../src/Pages/Landingpage/Errorpage";
import Footer from "./Pages/Landingpage/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import QueryDesh from "../src/Pages/DashboardPages/QueryDesh";
import Dashboard from "./Layout/Dashboard";
import SidebarContext from "./Context/SidebarContext";
import DashMain from "./Pages/DashboardPages/DashMain";
import AppointmentDesh from "./Pages/DashboardPages/AppointmentDesh";
import AppointmentCalendar from "./Pages/DashboardPages/AppointmentCalendar";
import Setting from "./Pages/DashboardPages/Setting";

const App = () => {
  //  ========== Default DATA

  const defaultData = [
    {
      date: Date.now() + 1,
      email: "default12@gmail.com",
      id: 1772204681236,
      name: "Default 1",
      phone: "03365745616",
      seen: true,
      select: "Dr. John Doe",
      slot: "2:30 AM",
      status: "pending",
      token: 1,
    },
  ];

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("appointmentData"));
    if (!data) {
      localStorage.setItem("appointmentData", JSON.stringify(defaultData));
    } else {
      console.log("data not found");
    }
  }, []);

  const navigate = useNavigate();

  const homeref = useRef(null);
  const doctorsref = useRef(null);
  const servicesref = useRef(null);
  const contactref = useRef(null);

  const ScrollSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Ref is null");
    }
  };

  const [appointedDoc, setAppointedDoc] = useState(""); // Doctor ka state

  const defaultAdmin = {
    email: "admin@12.com",
    password: "admin123",
    role: "Admin",
    name: "Super Admin",
  };

  const [isLogin, setIsLogin] = useState(false);

  // --------------------
  // Login
  // --------------------
  function loginData(form) {
    // 1️⃣ Read admin data from localStorage
    const adminData = JSON.parse(localStorage.getItem("admin"));

    // 2️⃣ If no admin data, fallback to default for first login
    const user = adminData || {
      email: "admin@12.com",
      password: "admin123",
      role: "Admin",
      name: "Super Admin",
    };

    // 3️⃣ Compare entered credentials with stored credentials
    if (form.email === user.email && form.password === user.password) {
      // Save in localStorage if first login
      if (!adminData) localStorage.setItem("admin", JSON.stringify(user));

      setIsLogin(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }
  // --------------------
  // Password Change
  // --------------------
  function LoginUpdate(form) {
    const adminData = JSON.parse(localStorage.getItem("admin"));

    if (!adminData) {
      alert("Please login first");
      return;
    }

    if (
      adminData.password === form.current && // current password match
      form.newPass === form.confirm && // confirm password match
      form.newPass.length >= 8 // minimum length
    ) {
      const updatedAdmin = { ...adminData, password: form.newPass };
      localStorage.setItem("admin", JSON.stringify(updatedAdmin)); // always update storage
    } else {
    }
  }

  // --------------------
  // App load → check login
  // --------------------
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setIsLogin(true); // ✅ user already login
    }
  }, []);

  return (
    <>
      <SidebarContext>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing
                  doctorsref={doctorsref}
                  servicesref={servicesref}
                  contactref={contactref}
                  homeref={homeref}
                  ScrollSection={ScrollSection}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            element={
              isLogin ? (
                <Navigate to="/dashboard" replace /> // agar already login → redirect dashboard
              ) : (
                <Login loginData={loginData} />
              )
            }
          />
          <Route
            path="/appointment"
            element={
              <>
                <Navbar />
                <Appointment
                  homeref={homeref}
                  ScrollSection={ScrollSection}
                  appointedDoc={appointedDoc}
                />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <Dashboard setIsLogin={setIsLogin} />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashMain />} />
            <Route path="appointments" element={<AppointmentDesh />} />
            <Route path="messages" element={<QueryDesh />} />
            <Route path="calendar" element={<AppointmentCalendar />} />
            <Route
              path="setting"
              element={<Setting LoginUpdate={LoginUpdate} />}
            />
          </Route>

          <Route path="*" element={<Errorpage />} />
        </Routes>
      </SidebarContext>
    </>
  );
};

export default App;
