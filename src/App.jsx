import { Routes, Route, useLocation } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Components/Navbar'
import Main from './Components/Main/Main'
import Appointment from './Components/Appointment/Appointment'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Landing from './Components/Main/Landing'
import Errorpage from './Components/Main/Errorpage'
import Footer from './Components/Main/Footer'
import Query from './Components/Dashboard/Query'
import DashboardNav from './Components/Dashboard/DashboardNav'

const App = () => {
  const location = useLocation()

const isLoginPage = location.pathname === "/login";

  const homeref = useRef(null)
  const doctorsref = useRef(null)
  const servicesref = useRef(null)
  const contactref = useRef(null)

  const ScrollSection = ref => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.log('Ref is null')
    }
  }

  const [appointedDoc, setAppointedDoc] = useState('') // Doctor ka state

  const [isLogin, setIsLogin] = useState(false)

  const admin = {
    email: 'admin@12.com',
    password: 'admin123',
    role: 'Admin',
    name: 'Super Admin'
  }


  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (admin) {
      setIsLogin(true)
    }
  }, [])

  function loginData (form) {
    if (form.email === 'admin@12.com' && form.password === 'admin123') {
      setIsLogin(true)
      localStorage.setItem('admin', JSON.stringify(admin))
    } else {
      alert('Invalid email or password')
    }
  }
 
return (
  <>

  {isLogin ? (
  <DashboardNav setIsLogin={setIsLogin} />
) : !isLoginPage ? (
  <Navbar
    ScrollSection={ScrollSection}
    homeref={homeref}
    doctorsref={doctorsref}
    servicesref={servicesref}
    contactref={contactref}
  />
) : null}

    <Routes>
      <Route
        path="/"
        element={
          <Landing
            setAppointedDoc={setAppointedDoc}
            doctorsref={doctorsref}
            servicesref={servicesref}
            contactref={contactref}
            homeref={homeref}
            ScrollSection={ScrollSection}
          />
        }
      />

      <Route
        path="/appointment"
        element={
          <Appointment
            homeref={homeref}
            ScrollSection={ScrollSection}
            appointedDoc={appointedDoc}
          />
        }
      />

      <Route
        path="/login"
        element={
          !isLogin ? (
            <Login setIsLogin={setIsLogin} loginData={loginData} />
          ) : (
            <Dashboard setIsLogin={setIsLogin} />            
          )
        }
      />

      <Route path="/query" element={<Query setIsLogin={setIsLogin} />} />
      <Route path="*" element={<Errorpage />} />

    </Routes>

    <Footer />

  </>
);
}

export default App
