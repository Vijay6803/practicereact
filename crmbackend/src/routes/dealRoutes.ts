import express from "express";

import { authmiddleware } from "../middleware/authMiddleware";
import { createDealValidation } from "../validation/dealValidations";
import {
  createDeal,
  deleteDeal,
  getAllDeals,
  getDeal,
  updateDeal,
} from "../controller/dealController";
import { dealMiddeware } from "../middleware/dealMiddleware";
const router = express.Router();
router.get("/", getAllDeals);
router.post("/", authmiddleware, createDealValidation, createDeal);
router.get("/:dealId", getDeal);
router.delete("/:dealId", authmiddleware, dealMiddeware, deleteDeal);
router.put(
  "/:dealId",
  authmiddleware,
  dealMiddeware,
  createDealValidation,
  updateDeal
);
export default router;
