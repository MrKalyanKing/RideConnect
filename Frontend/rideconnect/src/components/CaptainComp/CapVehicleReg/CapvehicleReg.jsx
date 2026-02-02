import React, { useState } from 'react'
import './CapVehicleReg.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'

const CapvehicleReg = () => {
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const handleFileChange = () => {

    }


    return (
        <div className='cap-vr-container'>
            <img src={cap_bg} alt="" className="bg-image" />

            <div className='cap-vr-box'>
                <h1>Captain Vehicle Registration</h1>

                <div className='cap-vr-form'>
                    <form onSubmit={handleSubmit}>
                        <div className="cap-vr-input-group">
                            <label>Vehicle Number</label>
                            <input type="text" name="vehicleNumber" placeholder='e.g. TS 17 AB 1234' onChange={handleChange} required />
                        </div>

                        <div className="cap-vr-input-group">
                            <label>Vehicle Type</label>
                            <select name="vehicleType" onChange={handleChange} required className="cap-vr-select">
                                <option value="" disabled selected>Select Vehicle Type</option>
                                <option value="Car">Car 🚗</option>
                                <option value="Auto">Auto 🛺</option>
                                <option value="Moto">Moto 🏍️</option>
                            </select>
                        </div>

                        <div className="cap-vr-input-group">
                            <label>Insurance Number</label>
                            <input type="text" name="insuranceNumber" placeholder='Enter Insurance Policy No.' onChange={handleChange} required />
                        </div>

                        <div className="cap-vr-input-group">
                            <label>Expiry Date</label>
                            <input type="date" name="insuranceExpiryDate" onChange={handleChange} required />
                        </div>

                        <div className="cap-vr-input-group">
                            <label>RC Book Number</label>
                            <input type="text" name="rcBook" placeholder='Enter RC Book No.' onChange={handleChange} required />
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