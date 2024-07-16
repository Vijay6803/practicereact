import { Request, Response, NextFunction } from "express";
import { Deals } from "@prisma/client";
import { getSingleContact } from "../repository/contactRepository";
import { getSingleDeal } from "../repository/dealRepository";

export const dealMiddeware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as { id: string; email: string };

  try {
    const deal: Deals | null = (await getSingleDeal(
      req.params.dealId
    )) as Deals;
    console.log(deal);

    if (!deal) {
      // throw new Error("company not found")
      return res.status(404).json({ message: "contact not found" });
    } else if (deal.userId !== user.id) {
      // throw new Error("Unauthorized Route")
      return res
        .status(401)
        .json({ message: "unauthorized to update or delete this resource" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "internal error" });
  }
};
