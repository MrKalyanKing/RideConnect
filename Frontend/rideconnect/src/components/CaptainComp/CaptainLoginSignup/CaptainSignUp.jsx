import React from 'react'
import './CaptainSignUp.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { Link } from 'react-router-dom'
const CaptainSignUp = () => {
  return (
    <div className='cap-signup'>
      <img src={cap_bg} alt="" />

      <div className='cap-signup-box'>
        <h1>Captain Portal Registration</h1>
        {/* <h2>Captain Registration</h2> */}
        <div className='cap-signup-form' >
          <form action="">
            <input type="text" placeholder='Name' />
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Phone Number' />
            <input type="text" placeholder='Password' />
            <input type="text" placeholder='Confirm Password' />
            <button type="submit">Sign Up</button>
            <div className='signup-test'>
              <span>Already Captain ? <span className='navigate' > <Link to='/captain/login' >Start Riding</Link>  </span> </span>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default CaptainSignUp