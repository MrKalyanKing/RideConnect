import React from 'react'
import logo from '../../../assets/Rc.png'
import './CustomerOtp.css'
import { Link } from 'react-router-dom'
const CustomerOtp = () => {
    return (
        <div class="cap-otp">
            <Link to="/" > <img src={logo} alt="" /></Link>
            <div className="otp-card">
                <h2>Enter OTP</h2>
                <p className="subtitle">We sent a code to your mobile number</p>

                <form>
                    <div class="otp-box">
                        <input className="otp" type="text" maxLength="1" />
                        <input className="otp" type="text" maxLength="1" />
                        <input className="otp" type="text" maxLength="1" />
                        <input className="otp" type="text" maxLength="1" />
                    </div>

                    <button className="verify-btn">Verify</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerOtp