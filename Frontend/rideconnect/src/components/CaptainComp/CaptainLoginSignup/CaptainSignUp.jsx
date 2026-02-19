import React, { useEffect, useEffectEvent, useState } from 'react'
import './CaptainSignUp.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { Link } from 'react-router-dom'



const CaptainSignUp = () => {

const [data,setData]=useState({
    name:"",
    email:"",
    phone:"",
})

const handleOnChange=(event)=>{
  const{name,value}=event.target

  setData((prev)=>({
    ...prev,[name]:value
  }))
}


const handleOnSubmit=(e)=>{
    e.preventDefault();



    setData({name:"",email:"",phone:""})
}


useEffect(()=>{
  console.log(data)
})



  return (
    <div className='cap-signup'>
      <img src={cap_bg} alt="" />

      <div className='cap-signup-box'>
        <h1>Captain Portal Registration</h1>
        {/* <h2>Captain Registration</h2> */}
        <div className='cap-signup-form' >

          <form onSubmit={handleOnSubmit} action="">

            <input type="text" value={data.name}    onChange={handleOnChange}  name='name' placeholder='Name' />
            <input type="text" value={data.email}  onChange={handleOnChange} name='email' placeholder='Email' />
            <input type="text" value={data.phone}  onChange={handleOnChange} name='phone' placeholder='Phone Number' />
            
            <button type="submit">Sign Up</button>
            <div className='signup-test'>
              <span>Already Captain ? <span className='navigate' > <Link to='/captain/otp' >Start Riding</Link>  </span> </span>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default CaptainSignUp