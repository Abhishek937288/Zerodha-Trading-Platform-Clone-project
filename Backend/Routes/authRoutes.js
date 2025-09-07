import { signup, verifyemail, signin, forgotpassword,newPassword, checkAuth} from "../Controllers/authController.js";

import { verifyToken } from "../Middleware/verify.js";
import { Router } from "express";
const router = Router();

router.post("/signup", signup);
router.post("/verifyemail", verifyemail);
router.post("/signin",signin);
router.post("/forgotpassword",forgotpassword);
router.post("/newPassword/:forgotpasstoken",newPassword); 
router.get("/check-auth",verifyToken,checkAuth);

export default router;
