import React from 'react'
import logo from '../../../assets/Rc.png'
import './CustomerOtp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { contextprovider } from '../../Context/ContextProvider'
import { useEffect } from 'react'

import cookie from "js-cookie"
const CustomerOtp = () => {

    const [Otp, setOtp] = useState(["", "", "", ""])
    const { url } = useContext(contextprovider)
    const navigate = useNavigate()

    const handleOnChange = (e, index) => {
        const value = e.target.value.replace(/\D/, ""); // allow only numbers
        if (!value) return;

        const newOtp = [...Otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // auto focus next input
        if (index < 3) {
            e.target.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...Otp];

            // If current box has value → clear it
            if (newOtp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            }
            // If empty → move to previous box
            else if (index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                e.target.previousSibling.focus();
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const enteredOtp = Otp.join("");
        console.log(enteredOtp)

        try {
            const res = await axios.post(`${url}/verify-otp`, { Otp: enteredOtp });

            setOtp(res);
            console.log(Otp);
            if (res.status == 201) {
                navigate("/home");
            }
            alert("user logged in")
        } catch (err) {
            if (err.response) {
                console.error("Error status:", err.response.status);
                console.error("Error data:", err.response.data);
                alert(`Error: ${err.response.data.message || "Registration failed"}`);
            } else {
                console.error("Error:", err.message);
                alert("Network Error");
            }
        }

    }
    const token = cookie.get("token")
    console.log(token)
    useEffect(() => {
        console.log(Otp)
    })



    return (
        <div className="cap-otp">
            <Link to="/" > <img src={logo} alt="" /></Link>
            <div className="otp-card">
                <h2>Enter OTP</h2>
                <p className="subtitle">We sent a code to your mobile number</p>

                <form onSubmit={handleSubmit} >
                    <div className="otp-box">
                        {Otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="otp"
                                value={digit}
                                onChange={(e) => handleOnChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>


                    <button className="verify-btn">Verify</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerOtp