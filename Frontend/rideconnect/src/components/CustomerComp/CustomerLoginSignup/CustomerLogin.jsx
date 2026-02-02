import React from 'react'
import LoginInterface from '../../../assets/CustomerInterfacebg.png'
import RideConnect from '../../../assets/Rc.png'
import './CustomerLogin.css'
import { Link } from 'react-router-dom'
const CustomerLogin = () => {
  return (
    <div className='cus-login'>
      <img src={LoginInterface} alt="" />
      <div className="login-box">
        <div className="rc-logo">
          <Link to='/' > <img src={RideConnect} alt="" /></Link>
        </div>
        <div className="form-login">
          <form action="">
            <input type="text" name="" id="" placeholder='Enter Phone Number' /> <br />
            <span>(OR)</span><br />
            <input type="text" name="" id="" placeholder='Enter Email' />

            <Link to='/customer/otp' > <button className='signup-btn' >Ride to Login</button></Link>
            <div className='signup-test'>
              <span>New to RideConnect? <span className='inner-span'><Link to="/customer/signup" >Sign Up</Link></span></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomerLogin