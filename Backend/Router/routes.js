import { Router } from "express";
import { userLogin, userRegister } from "../Controller/UserController/UserLoginSignup.js";
import { CaptainLogin, CaptainRegister } from "../Controller/CaptainController/CaptainRegister.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin)

//captain routes

router.post("/captain/register", CaptainRegister)
router.post("/captain/login", CaptainLogin)

export default router;
