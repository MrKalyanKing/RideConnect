import React, { useEffect, useState } from 'react'
import './CapVehicleReg.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { Link, useNavigate } from 'react-router-dom'
 //import axios from 'axios'

const CapvehicleReg = () => {
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const handleFileChange = () => {

    }
    const [data,setData]=useState({
       vehicleNumber:"",
       vehicletype:"",
       insuranceNumber:"",
       insuranceExpiryDate:"",
       rcBook:"",
       
    })
    const handleOnChange=(event)=>{
        const {name,value}=event.target
        setData((prev)=>({
        ...prev,[name]:value
        }))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();


        setData({vehicleNumber:"",insuranceNumber:"", vehicletype:"", insuranceExpiryDate:"",rcBook:""})
    }
    useEffect(()=>{
        console.log(data)
    })


    

    return (
        <div className='cap-vr-container'>
            <img src={cap_bg} alt="" className="bg-image" />

            <div className='cap-vr-box'>
                <h1>Captain Vehicle Registration</h1>

                <div className='cap-vr-form'>
                    <form onSubmit={handleOnSubmit}>
                        <div className="cap-vr-input-group">
                            <label>Vehicle Number</label>
                            <input type="text" name="vehicleNumber" value={data.vehicleNumber}  placeholder='e.g. TS 17 AB 1234' onChange={handleOnChange} required />
                        </div>

                        <div className="cap-vr-input-group">
                            <label>Vehicle Type</label>
                            <select name="vehicletype"  value={data.vehicletype} onChange={handleOnChange} required className="cap-vr-select">
                                <option value="" disabled selected>Select Vehicle Type</option>
                                <option value="Car">Car 🚗</option>
                                <option value="Auto">Auto 🛺</option>
                                <option value="Moto">Moto 🏍️</option>
                            </select>
                        </div>

                        <div className="cap-vr-input-group">
                            <label>Insurance Number</label>
                            <input type="text" name="insuranceNumber" value={data.insuranceNumber} placeholder='Enter Insurance Policy No.' onChange={handleOnChange} required />
                        </div>

                        <div className="cap-vr-input-group">
                            <label>Expiry Date</label>
                            <input type="date" value={data.insuranceExpiryDate} name="insuranceExpiryDate" onChange={handleOnChange} required />
                        </div>

                        <div className="cap-vr-input-group">
                            <label>RC Book Number</label>
                            <input type="text" name="rcBook" value={data.rcBook} placeholder='Enter RC Book No.' onChange={handleOnChange} required />
                        </div>

                        <div className="cap-vr-file-section">
                            <div className="cap-vr-file-wrapper">
                                <label htmlFor="rcUpload" className="cap-vr-file-label">📄 Upload RC Book</label>
                                <input type="file" name="rcBookImage" id="rcUpload" onChange={handleFileChange} required />
                            </div>
                            <div className="cap-vr-file-wrapper">
                                <label htmlFor="insUpload" className="cap-vr-file-label">🛡️ Upload Insurance</label>
                                <input type="file" name="insuranceImage" id="insUpload" onChange={handleFileChange} required />
                            </div>
                        </div>

                        <button type="submit" className="cap-vr-btn">Register Vehicle</button>

                        <div className='cap-vr-footer'>
                            <span>Already Registered? <Link to='/captain/login' className='cap-vr-link'>Back to Login</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CapvehicleReg