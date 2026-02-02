import CaptainVehicleModel from "../../models/CaptainModel/CaptainVehicleReg.js"
import UploadFile from "../../services/ImageCloud/image.services.js";
import { getIO } from "../../socket.js";


const CaptainVehicleRegistration = async (req, res) => {

    try {

        const rcBookImage = req.files?.rcBookImage?.[0];
        const insuranceImage = req.files?.insuranceImage?.[0];
        const { vehicleNumber, vehicleType, insuranceNumber, insuranceExpiryDate, rcBook } = req.body

        if (!vehicleNumber || !vehicleType || !insuranceNumber || !insuranceExpiryDate || !rcBook) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const isVehicleExist = await CaptainVehicleModel.findOne({ vehicleNumber })

        if (isVehicleExist) {
            return res.status(400).json({ message: "Vehicle already exists" })
        }

        const InImg = await UploadFile(rcBookImage.buffer)
        const rcImg = await UploadFile(insuranceImage.buffer)

        const newVehicle = new CaptainVehicleModel({
            vehicleNumber,
            vehicleType,
            insuranceNumber,
            insuranceExpiryDate,
            insuranceImage: InImg.url,
            rcBook,
            rcBookImage: rcImg.url
        })

        await newVehicle.save()

        // 
        const io = getIO();
        io.emit('new_vehicle_submitted', newVehicle);

        res.status(201).json({ message: "Vehicle registered successfully", newVehicle })

    } catch (error) {
        res.status(500).json({ message: "image section", error: error.message })
    }
}




export { CaptainVehicleRegistration }