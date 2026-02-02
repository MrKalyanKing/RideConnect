import React from 'react'
import './CaptainOtp.css'
import logo from '../../../assets/Rc.png'
const CaptainOtp = () => {
    return (

        <div class="cap-otp">
            <img src={logo} alt="" />
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

export default CaptainOtp