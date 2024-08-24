import { Router } from "express";
import { logout, userLogin, userPage, userRegister } from "../controllers/user.controllers.js";
import { authenticateToken, authorizeRole } from "../middlewares/authenticateToken.js";

const router = Router()

router.route("/signup").post(userRegister)
router.route("/login").post(userLogin)
router.route("/logout").get(logout)
router.route("/user").get(authenticateToken,authorizeRole('user'),userPage)
router.route("/admin").get(authenticateToken,authorizeRole('admin'),userPage)

export {router}