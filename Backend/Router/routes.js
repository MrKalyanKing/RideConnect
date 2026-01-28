import { Router } from "express";
import { userLogin, userRegister } from "../Controller/UserController/UserLoginSignup.js";
import { CaptainLogin, CaptainRegister } from "../Controller/CaptainController/CaptainRegister.js";
import { CaptainVehicleRegistration } from "../Controller/CaptainController/CaptainVehicle.js";
import { adminLogin, adminReg } from "../Controller/adminController/adminController.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin)

//captain routes

router.post("/captain/register", CaptainRegister)
router.post("/captain/login", CaptainLogin)

//captain vehicle reigster

router.post("/captain/vehicle/reg", CaptainVehicleRegistration)

//admin routes

router.post("/admin/register", adminReg)
router.post("/admin/login", adminLogin)

export default router;
