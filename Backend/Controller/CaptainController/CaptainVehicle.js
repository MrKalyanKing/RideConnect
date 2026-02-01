import CaptainVehicleModel from "../../models/CaptainModel/CaptainVehicleReg.js"
import { getIO } from "../../socket.js";


const CaptainVehicleRegistration = async (req, res) => {

    try {

        const { vehicleNumber, vehicleType, insuranceNumber, insuranceExpiryDate, insuranceImage, rcBook, rcBookImage } = req.body

        if (!vehicleNumber || !vehicleType || !insuranceNumber || !insuranceExpiryDate || !insuranceImage || !rcBook || !rcBookImage) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const isVehicleExist = await CaptainVehicleModel.findOne({ vehicleNumber })

        if (isVehicleExist) {
            return res.status(400).json({ message: "Vehicle already exists" })
        }

        const newVehicle = new CaptainVehicleModel({
            vehicleNumber,
            vehicleType,
            insuranceNumber,
            insuranceExpiryDate,
            insuranceImage,
            rcBook,
            rcBookImage
        })

        await newVehicle.save()

        // 
        const io = getIO();
        io.emit('new_vehicle_submitted', newVehicle);

        res.status(201).json({ message: "Vehicle registered successfully", newVehicle })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { CaptainVehicleRegistration }