import React, { useEffect, useState } from 'react'

import './CustomerSignUp.css'
import signupInterface from '../../../assets/CustomerInterfacebg.png'
import RideConnect from '../../../assets/Rc.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useContext } from 'react'
import { contextprovider } from '../../Context/ContextProvider'



const CustomerSignUp = () => {

  const [data, setData] = useState({
    phone: "",
    email: ""
  })

  const { url } = useContext(contextprovider)
  const navigate = useNavigate()


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(`${url}/register`, data)
      setData(res.data);
      console.log(res);
      if (res.status === 201) {
        navigate('/customer/otp')
        // navigate or clear form if needed
      }

    } catch (err) {

      if (err.response) {
        console.error("Error status:", err.response.status);
        console.error("Error data:", err.response.data);
        alert(`Error: ${err.response.data.message || "Registration failed"}`);
      } else {
        console.error("Error:", err.message);
        alert("Network Error");
      }
    }
  }
  useEffect(() => {
    console.log(data)
  })




  return (
    <div className='signup' >
      <img src={signupInterface} alt="" />
      <div className='signup-box'>
        <div className='logo'>
          <Link to='/' > <img src={RideConnect} alt="" /></Link>
        </div>
        <form onSubmit={handleOnSubmit} action="">
          <div>
            <input type="number"
              name="phone"
              value={data.phone}
              onChange={handleOnChange}
              placeholder='Phone Number' />


            <input type="text"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder='Email' />
          </div>

          <button className='signup-btn' >Start Riding</button>
          <div className='signup-test'>
            <span>Login into RideConnect? <span className='inner-span' ><Link to="/customer/login" >Login</Link></span></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerSignUp