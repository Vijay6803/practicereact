import express from "express"
import { createContact, deleteContact, getContact, updateContact } from "../controller/contactController";
import { authmiddleware } from "../middleware/authMiddleware";
import { createContactValidation, updateContactValidation } from "../validation/contactValidation";
import { contactMiddleware } from "../middleware/contactMiddeware";
const router = express.Router();
router.post("/", authmiddleware, createContactValidation, createContact)
router.get("/:contactId", getContact)
router.delete("/:contactId", authmiddleware, contactMiddleware, deleteContact)
router.put("/:contactId", authmiddleware, contactMiddleware, createContactValidation, updateContact)
export default router