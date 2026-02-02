import React, { useState } from 'react'
import './CapVehicleReg.css'
import cap_bg from '../../../assets/CaptainLogin.png'
import { Link, useNavigate } from 'react-router-dom'


const CapvehicleReg = () => {


    const handleChange = () => {

    }
    return (
        <div className='cap-signup'>
            <img src={cap_bg} alt="" className="bg-image" />

            <div className='cap-signup-box'>
                <h1>Captain Vehicle Registration</h1>

                <div className='cap-signup-form' >
                    <form >
                        <div className="input-group">
                            <label>Vehicle Number</label>
                            <input type="text" name="vehicleNumber" placeholder='e.g. TS 17 AB 1234' onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <label>Vehicle Type</label>
                            <select name="vehicleType" onChange={handleChange} required className="vehicle-select">
                                <option value="" disabled selected>Select Vehicle Type</option>
                                <option value="Car">Car 🚗</option>
                                <option value="Auto">Auto 🛺</option>
                                <option value="Moto">Moto 🏍️</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Insurance Number</label>
                            <input type="text" name="insuranceNumber" placeholder='Enter Insurance Policy No.' onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <label>Expiry Date</label>
                            <input type="date" name="insuranceExpiryDate" onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <label>RC Book Number</label>
                            <input type="text" name="rcBook" placeholder='Enter RC Book No.' onChange={handleChange} required />
                        </div>

                        <div className="file-upload-section">
                            <div className="file-input-wrapper">
                                <label htmlFor="rcUpload" className="file-label">📄 Upload RC Book</label>
                                <input type="file" name="rcBookImage" id="rcUpload" required />
                            </div>
                            <div className="file-input-wrapper">
                                <label htmlFor="insUpload" className="file-label">🛡️ Upload Insurance</label>
                                <input type="file" name="insuranceImage" id="insUpload" required />
                            </div>
                        </div>

                        <button type="submit" className="reg-btn">Register Vehicle</button>

                        <div className='signup-test'>
                            <span>Already Registered? <Link to='/captain/login' className='navigate'>Back to Login</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CapvehicleReg