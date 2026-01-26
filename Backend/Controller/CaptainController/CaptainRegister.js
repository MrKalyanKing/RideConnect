
import CaptainRegModel from "../../models/CaptainModel/CaptainRegister.js"

import crypto from "crypto"
import { Session } from "express-session"
const CaptainRegister = async (req, res) => {

    try {
        const { phone } = req.body

        const captain = await CaptainRegModel.findOne({ phone })

        if (captain) {
            return res.status(400).json({ message: "captain is ALready Exists", })
        }

        if (!phone) {
            return res.status(400).json({ message: "Phone number filed is required" })
        }
        if (phone && String(phone).length !== 10) {
            return res.status(400).json({ message: "Phone number filed is Invalid" })
        }
        const generateOtp = () => {
            return crypto.randomInt(0, 10000).toString().padStart(4, "0")
        }

        const otp = generateOtp()

        const newCap = await CaptainRegModel({
            phone: phone,
            Otp: otp
        })

        await newCap.save()
        console.log(otp)

        return res.status(200).json({ message: "Captain was saved", newCap })

    } catch (err) {
        return res.status(400).json({ message: "captain not saved err", err })
    }
}

const CaptainLogin = async (req, res) => {
    const { phone, Otp } = req.body

    const captain = await CaptainRegModel.findOne({ phone })


    if (!captain) {
        return res.status(400).json({ message: "captain is not Exists must register", })
    }
    if (!phone) {
        return res.status(400).json({ message: "Phone number field is required" })
    }

    function generateOtp() {
        return crypto.randomInt(10000).toString().padStart("4", 0);
    }

    if (!Otp) {
        const newOtp = generateOtp()
        captain.Otp = newOtp
        await captain.save();
        console.log(newOtp)
        return res.status(200).json({ message: "OTP sent", otp: newOtp });
    }

    if (captain.Otp !== Otp) {
        return res.status(400).json({ message: "Invalid otp" })
    }

    captain.Otp = undefined
    captain.save();


    req.session.captainId = captain._id
    req.session.isAuthenticated = true
    console.log(req.session.ID)
    return res.status(200).json({ message: "Captain Logged In", captain })


}

export { CaptainRegister, CaptainLogin }