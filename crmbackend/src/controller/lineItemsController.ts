// import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { lineItemsI } from "../types/types";
// import { LineItems } from "@prisma/client";
// // id (String, Primary Key, Unique)
// // title (String, Required)
// // amount (Number, Required)
// // stage (String, Enum: [“Prospecting”, “Qualification”, “Proposal”, “Negotiation”, “Closed Won”, “Closed Lost”], Default: “Prospecting”)
// // closeDate (Date)
// export const createlineItem = async (
//   req: Request<{}, {}, LineItems, {}>,
//   res: Response
// ) => {
//   try {
//     // return res.status(201).json({ createdlineItem: createdlineItem });
//   } catch (error) {
//     const e = error as Error;
//     return res.status(500).json({ message: e.message });
//   }
// };

// export const updatelineItem = async (
//   req: Request<{ lineItemId: string }, {}, LineItems, {}>,
//   res: Response
// ) => {
//   try {
//     const lineItemid = req.params.lineItemId;
//     const updatedlineItem = await updateSignlelineItem(lineItemid, req.body);
//     console.log(updatedlineItem);
//     return res.status(201).json({ updatedlineItem: updatedlineItem });
//   } catch (error) {
//     const e = error as Error;
//     return res.status(500).json({ message: e.message });
//   }
// };

// export const getlineItem = async (
//   req: Request<{ lineItemId: string }, {}, {}, {}>,
//   res: Response
// ) => {
//   try {
//     // return res.status(200).json({ singlelineItem: singlelineItem });
//   } catch (error) {
//     const e = error as Error;
//     return res.status(500).json({ message: e.message });
//   }
// };
// export const deletelineItem = async (
//   req: Request<{ lineItemId: string }, {}, {}, {}>,
//   res: Response
// ) => {
//   try {
//     const deletedlineItem = await deleteSignlelineItem(lineItemId);
//     return res.status(200).json({ message: "lineItem deleted" });
//   } catch (error) {
//     const e = error as Error;
//     return res.status(500).json({ message: e.message });
//   }
// };
