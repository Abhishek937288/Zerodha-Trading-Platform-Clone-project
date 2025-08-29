import { signup,verifyemail } from "../Controllers/authController.js";
import { Router } from "express";
const router = Router();

router.post ("/signup",signup);
router.post("/verifyemail", verifyemail);


export default router;