import mongoose from "mongoose";

const captainRegisterSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    Otp: {
        type: String
    }
})

const CaptainRegModel = mongoose.model("CaptainRegister", captainRegisterSchema)

export default CaptainRegModel