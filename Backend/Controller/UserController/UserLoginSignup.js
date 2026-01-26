import validator from "validator";
import crypto from "crypto"
import UserModel from "../../models/UserModel/User.js";
import cookieParser from "cookie-parser";
import session from "express-session";


const userRegister = async (req, res) => {
    const { phone, email } = req.body;


    const user = await UserModel.findOne({ email })

    if (user || email) {
        return res.status(400).json({ message: "user is AlreadyExists" })
    }

    if (!phone && !email) {
        return res.status(400).json({ message: "phone and email are required" });
    }

    if (phone && phone.length !== 10) {
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
        console.log(Otp);
        return res.status(200).json({ message: "User created", saveduser: saveduser });
    } catch (err) {
        return res.status(400).json({ message: err })
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

        // const isValidotp = await verifyOtp(otp, email);


        if (user.Otp !== Otp) {
            return res.status(400).json({ message: "Invalid otp" })
        }


        user.Otp = undefined
        await user.save();

        //creating an seesion

        req.session.userId = user._id
        req.session.isAuthenticated = true
        // console.log(req.session.ID)
        return res.status(200).json({ message: "user logged in " })

    } catch (err) {
        return res.status(400).json({ message: err })
    }


}

export { userRegister, userLogin }