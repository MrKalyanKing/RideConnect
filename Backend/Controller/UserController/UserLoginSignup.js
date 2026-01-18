import validator from "validator";
import crypto from "crypto"
import UserModel from "../../models/UserModel/User.js";
const userRegister = async (req, res) => {
    const { phone, email } = req.body;

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

export { userRegister }