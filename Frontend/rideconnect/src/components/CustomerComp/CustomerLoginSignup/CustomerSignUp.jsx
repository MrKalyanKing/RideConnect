import React from 'react'

import './CustomerSignUp.css'
import signupInterface from '../../../assets/CustomerInterfacebg.png'
import RideConnect from '../../../assets/Rc.png'
import { Link } from 'react-router-dom'
const CustomerSignUp = () => {
  return (
    <div className='signup' >
      <img src={signupInterface} alt="" />
      <div className='signup-box'>
        <div className='logo'>
          <img src={RideConnect} alt="" />
        </div>
        <form action="">
          <div>
            <input type="text" name="" id="" placeholder='Phone Number' />
            <input type="text" name="" id="" placeholder='Email' />
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