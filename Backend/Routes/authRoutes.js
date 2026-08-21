import {
  signup,
  verifyemail,
  signin,
  forgotpassword,
  newPassword,
  checkAuth,
  logOut,
} from "../Controllers/authController.js";

import { protectRoute } from "../Middleware/protectRoute.js";
import { Router } from "express";
const router = Router();

router.post("/signup", signup);
// Email verification disabled for production (frontend on Vercel, backend on Render).
// Uncomment to re-enable along with the verification logic in authController signup.
// router.post("/verifyemail", verifyemail);
router.post("/signin", signin);
router.post("/forgotpassword", forgotpassword);
router.post("/newPassword/:forgotpasstoken", newPassword);
router.post("/log-out", logOut);
router.get("/check-auth", protectRoute, checkAuth);

export default router;
