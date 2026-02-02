import React, { useEffect, useState } from 'react'

import './CustomerSignUp.css'
import signupInterface from '../../../assets/CustomerInterfacebg.png'
import RideConnect from '../../../assets/Rc.png'
import { Link } from 'react-router-dom'
const CustomerSignUp = () => {

  const [data, setData] = useState({
    phone: "",
    email: ""
  })

  const handleOnChange = ((e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  })

  const handleOnSubmit = (e) => {
    e.preventDefault();
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
            <input type="text"
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