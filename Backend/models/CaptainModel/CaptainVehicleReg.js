import mongoose from "mongoose";

const CaptainvehicleScehma = new mongoose.Schema({

    status: {
        type: String,
        enum: ["pending", "rejected", "approved"],
        default: "pending"
    },

    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    insuranceNumber: {
        type: String,
        required: true,
        unique: true
    },
    insuranceExpiryDate: {
        type: Date,
        required: true
    },
    insuranceImage: {
        type: String,

    },
    rcBook: {
        type: String,
        required: true
    },
    rcBookImage: {
        type: String,

    },
})

const CaptainVehicleModel = mongoose.model("vehicleDetail", CaptainvehicleScehma)

export default CaptainVehicleModel