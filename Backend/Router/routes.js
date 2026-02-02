import { Router } from "express";
import { userLogin, userRegister } from "../Controller/UserController/UserLoginSignup.js";
import { CaptainLogin, CaptainRegister } from "../Controller/CaptainController/CaptainRegister.js";
import { CaptainVehicleRegistration } from "../Controller/CaptainController/CaptainVehicle.js";
import { adminLogin, adminReg, getPendingVehicles } from "../Controller/adminController/adminController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });


const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin)

//captain routes

router.post("/captain/register", CaptainRegister)
router.post("/captain/login", CaptainLogin)

//captain vehicle reigster

router.post(
    "/captain/vehicle/reg",
    upload.fields([
        { name: "rcBookImage", maxCount: 1 },
        { name: "insuranceImage", maxCount: 1 }
    ]),
    CaptainVehicleRegistration
);


//admin routes

router.post("/admin/register", adminReg)
router.post("/admin/login", adminLogin)
router.get("/admin/vehicle/pending", getPendingVehicles)

//testing image uploader

// router.post('/cap/img', upload.single("image"), CapImage)

export default router;
