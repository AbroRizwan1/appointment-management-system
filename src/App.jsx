import { Routes, Route, useLocation, useNavigate, Navigate  } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main/Main";
import Appointment from "./Components/Appointment/Appointment";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Landing from "./Components/Main/Landing";
import Errorpage from "./Components/Main/Errorpage";
import Footer from "./Components/Main/Footer";
import Query from "./Components/Dashboard/Query";
import DashboardNav from "./Components/Dashboard/DashboardNav";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
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

  const [isLogin, setIsLogin] = useState(false);

  const admin = {
    email: "admin@12.com",
    password: "admin123",
    role: "Admin",
    name: "Super Admin",
  };

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setIsLogin(true);
    }
  }, []);

  function loginData(form) {
    if (form.email === "admin@12.com" && form.password === "admin123") {
      localStorage.setItem("admin", JSON.stringify(admin));
      setIsLogin(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              doctorsref={doctorsref}
              servicesref={servicesref}
              contactref={contactref}
              homeref={homeref}
              ScrollSection={ScrollSection}
            />
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
              <DashboardNav setIsLogin={setIsLogin} />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/query"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <DashboardNav setIsLogin={setIsLogin} />
              <Query />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Errorpage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
