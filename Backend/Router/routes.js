import { Router } from "express";
import { userLogin, userRegister } from "../Controller/UserController/UserLoginSignup.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin)

export default router;
