import { Router } from "express";
import { userRegister } from "../Controller/UserController/UserLoginSignup.js";

const router = Router();

router.post("/register", userRegister);

export default router;
