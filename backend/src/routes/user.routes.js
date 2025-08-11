import exress from "express"
import { login, register } from "../controllers/user.contollers.js"

const router = exress.Router()

router.route("/register").post(register)
router.route("/login").post(login)

export default router