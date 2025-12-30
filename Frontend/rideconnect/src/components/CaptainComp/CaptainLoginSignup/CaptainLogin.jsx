import React from 'react'
import './CaptainLogin.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { Link } from 'react-router-dom'
const CaptainLogin = () => {
  return (
    <div className='cap-login'>
      <img src={cap_bg} alt="" />
      <div className="cap-login-box">
        <div className="cap-login-from">
          <h1>Captain Portal Login</h1>
          <form action="">
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Password' />
            <span>(OR)</span>
            <input type="text" name="" id="" placeholder='Phone Number' />
            <button>Start Riding</button>
            <div className="cap-login-test">
              <span>New to RideConnect ? <span className='navigate'>  <Link to="/captain/signup" >  Register</Link></span>  </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin