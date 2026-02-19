import React, { useEffect, useEffectEven, useState } from 'react'
import './CaptainLogin.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { data, Link } from 'react-router-dom'



const CaptainLogin = () => {

const [data,setData]=useState({
  phone:"",
 
})
const handleOnChange=(event)=>{
  const {name,value}=event.target

  setData((prev)=>({
    ...prev,[name]:value
  }))
}

const handleOnSubmit=(e)=>{
  e.preventDefault();

  setData({phone:""})
}
useEffect(()=>{
  console.log(data)
})


  return (
    <div className='cap-login'>
      <img src={cap_bg} alt="" />
      <div className="cap-login-box">
        <div className="cap-login-from">
          <h1>Captain Portal Login</h1>

          <form  onSubmit={handleOnSubmit} action="">
            
            <input type="number" value={data.phone} onChange={handleOnChange} maxLength={"10"} name="phone" id="" placeholder='Phone Number' />

            

            <Link to="/captain/otp"> <button>Start Riding</button></Link>
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