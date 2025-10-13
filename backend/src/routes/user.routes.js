import exress from "express"
import { login, logOut, register } from "../controllers/user.contollers.js"

const router = exress.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logOut)

export default router