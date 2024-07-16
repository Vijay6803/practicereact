import express from "express"
import { login, logout, register } from "../auth/auth"
import { createUSerValidation } from "../validation/userValidation"
const router = express.Router()
router.post("/register", createUSerValidation, register)
router.post("/login", login)
router.get("/logout", logout)
export default router