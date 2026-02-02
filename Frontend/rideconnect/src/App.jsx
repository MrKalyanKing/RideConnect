import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CaptainLogin from './components/CaptainComp/CaptainLoginSignup/CaptainLogin'
import CaptainSignUp from './components/CaptainComp/CaptainLoginSignup/CaptainSignUp'
import CustomerLogin from './components/CustomerComp/CustomerLoginSignup/CustomerLogin'
import CustomerSignUp from './components/CustomerComp/CustomerLoginSignup/CustomerSignUp'
import Home from './components/Pages/Home'
import CaptainOtp from './components/CaptainComp/CaptainLoginSignup/CaptainOtp'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/captain/login" element={<CaptainLogin />} />
      <Route path="/captain/signup" element={<CaptainSignUp />} />
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/customer/signup" element={<CustomerSignUp />} />
      <Route path='/captain/otp' element={<CaptainOtp />} />

    </Routes>
  )
}

export default App