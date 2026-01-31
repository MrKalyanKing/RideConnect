import { AdminModel } from "../../models/admin/AdminModel.js"
import CaptainVehicleModel from "../../models/CaptainModel/CaptainVehicleReg.js";

import bcrypt from "bcrypt"
import session from "express-session"


const adminReg = async (req, res) => {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(201).json({ message: "fields are required" })
        }

        const adminExist = await AdminModel.findOne({ email })

        if (adminExist) {
            return res.status(201).json({ message: "admin already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = new AdminModel({
            name,
            email,
            password: hashedPassword
        })

        await admin.save()

        return res.status(201).json({ message: "admin registered successfully", admin })
    } catch (err) {
        return res.status(201).json({ message: "admin not registered", err })
    }

}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const adminExist = await AdminModel.findOne({ email })

        if (!adminExist) {
            return res.status(201).json({ message: "admin not found" })
        }

        const isPasswordMatched = await bcrypt.compare(password, adminExist.password)

        if (!isPasswordMatched) {
            return res.status(201).json({ message: "invalid password" })
        }

        req.session.adminId = adminExist._id
        req.session.isAuthenticated = true
        console.log(req.session.ID)
        return res.status(201).json({ message: "admin logged in successfully", adminExist })
    } catch (err) {
        return res.status(201).json({ message: "admin not logged in", err })
    }

}

const getPendingVehicles = async (req, res) => {
    try {
        const vehicles = await CaptainVehicleModel.find({ status: "pending" });
        return res.status(200).json({ message: "Pending vehicles", vehicles });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching vehicles", err });
    }
}

export { adminReg, adminLogin, getPendingVehicles }