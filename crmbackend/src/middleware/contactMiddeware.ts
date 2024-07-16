import { Request, Response, NextFunction } from "express";
import { Contact } from "@prisma/client";
import { getSingleContact } from "../repository/contactRepository";

export const contactMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as { id: string; email: string };

  try {
    const contact: Contact | null = (await getSingleContact(
      req.params.contactId
    )) as Contact;
    console.log(contact);

    if (!contact) {
      // throw new Error("company not found")
      return res.status(404).json({ message: "contact not found" });
    } else if (contact.userId !== user.id) {
      // throw new Error("Unauthorized Route")
      return res.status(401).json({ message: "unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "internal error" });
  }
};
