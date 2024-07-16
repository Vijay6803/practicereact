import express from "express"
import { createCompany, deleteCompany, getAllCompany, getCompany, updateCompany } from "../controller/companyController"
import { authmiddleware } from "../middleware/authMiddleware"
import { createCompanyValidation } from "../validation/companyValidation"
import { companyMiddleware } from "../middleware/companyMiddleware"
const router = express.Router()

router.post("/", authmiddleware, createCompanyValidation, createCompany)
router.get("/", getAllCompany)
router.get("/:companyId", getCompany)
router.put("/:companyId", authmiddleware, createCompanyValidation, companyMiddleware, updateCompany)
router.delete("/:companyId", authmiddleware, companyMiddleware, deleteCompany)
export default router