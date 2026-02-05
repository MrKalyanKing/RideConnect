import validator from "validator";
import crypto from "crypto"
import UserModel from "../../models/UserModel/User.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { measureMemory } from "vm";


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
        req.session.userId = saveduser._id
        req.session.isAuthenticated = true
        console.log(Otp);
        return res.status(200).json({ message: "User created", saveduser: saveduser });
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
        const { phone, email, Otp } = req.body;

        if ((!phone && !email)) {
            return res.status(400).json({ message: "Fileds are reqired" })
        }

        const user = await UserModel.findOne({ email })

        if (!user || !email) {
            return res.status(400).json({ message: "user is NotExists" })
        }

        if (user || email) {
            function otpGenerator() {
                return crypto.randomInt(0, 10000).toString().padStart(4, "0")
            }
        }
        // const isValidotp = await verifyOtp(otp, email);


        if (!Otp) {
            const newOtp = crypto.randomInt(0, 10000).toString().padStart(4, "0");
            user.Otp = newOtp;
            await user.save();
            console.log(newOtp);
            return res.status(200).json({ message: "OTP sent", otp: newOtp });
        }

        if (user.Otp !== Otp) {
            return res.status(400).json({ message: "Invalid otp" })
        }


        user.Otp = undefined
        await user.save();

        //creating an seesion

        req.session.userId = user._id
        req.session.isAuthenticated = true
        console.log(req.session.ID)
        return res.status(200).json({ message: "user logged in " })

    } catch (err) {
        return res.status(400).json({ message: err })
    }


}

export { userRegister, userLogin }