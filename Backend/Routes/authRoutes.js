import { signup, verifyemail, signin, forgotpassword,newPassword, checkAuth} from "../Controllers/authController.js";

import { verifyToken } from "../Middleware/verify.js";
import { Router } from "express";
const router = Router();

router.post("/signup", signup);
router.post("/verifyemail", verifyemail);
router.post("/signin",signin);
router.post("/forgotpassword",forgotpassword);
router.post("/newPassword",newPassword); // here  will use the frontend url (now only for the teting purpose)
router.get("/check-auth",verifyToken,checkAuth);

export default router;
