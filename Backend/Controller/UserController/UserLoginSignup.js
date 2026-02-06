import validator from "validator";
import crypto from "crypto"
import UserModel from "../../models/UserModel/User.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import jwt from "jsonwebtoken"
import { measureMemory } from "vm";
import dotenv from "dotenv"
dotenv.config()

const userRegister = async (req, res) => {
    const { phone, email } = req.body;

    if (!phone || !email) {
        return res.status(401).json({ message: "fields are required" })
    }


    const existingUser = await UserModel.findOne({
        $or: [{ email: email }, { phone: phone }]
    });

    if (existingUser) {
        return res.status(400).json({ message: "User with this email or phone already exists" });
    }

    if (!phone && !email) {
        return res.status(400).json({ message: "phone and email are required" });
    }

    if (phone && String(phone).length !== 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const generateOtp = () => {
        return crypto.randomInt(0, 10000).toString().padStart(4, "0")
    }
    const Otp = generateOtp();

    const User = await UserModel({
        phone: phone,
        email: email,
        Otp: Otp
    })
    try {
        const saveduser = await User.save();
        // NOTE: In a real app, send OTP via SMS/Email here.
        console.log(`OTP for ${email}: ${Otp}`);
        return res.status(200).json({ message: "OTP sent successfully", otp: Otp });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "User with this email or phone already exists" });
        }
        console.error("Register Error:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
const verifyOtp = async (otp, email) => {
    const user = await UserModel.findOne({ email });

    if (!user || !user.Otp) return false;

    return otp === user.Otp;
}

const userLogin = async (req, res) => {

    try {
        const { phone, email } = req.body;

        if ((!phone && !email)) {
            return res.status(400).json({ message: "Fileds are reqired" })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "user is NotExists" })
        }

        const newOtp = crypto.randomInt(0, 10000).toString().padStart(4, "0");
        user.Otp = newOtp;
        await user.save();
        console.log(`OTP for login ${email}: ${newOtp}`);
        return res.status(200).json({ message: "OTP sent", otp: newOtp });

    } catch (err) {
        return res.status(400).json({ message: err })
    }
}

const verifyOtpController = async (req, res) => {
    try {
        const { Otp } = req.body;
        console.log(Otp)
        if (!Otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await UserModel.findOne({ Otp });

        if (!user || user.Otp !== Otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP verified, clear it
        user.Otp = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({ message: "Login success", token, decoded, user });

    } catch (err) {
        console.error("Verify OTP Error:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export { userRegister, userLogin, verifyOtpController }