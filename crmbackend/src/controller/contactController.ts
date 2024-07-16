import { Request, Response } from "express";
import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_SEARCH,
  DEFAULT_SORT_BY,
} from "../constant/constant";
import {
  createSingleContact,
  deleteSignleContact,
  findAllContacts,
  getSingleContact,
  getSingleContactWithCompanys,
  getSingleContactWithDeals,
  uniqueEmailForUser,
  updateSignleContact,
} from "../repository/contactRepository";
import { v4 as uuidv4 } from "uuid";
import { Contact } from "@prisma/client";
import { QueryI } from "../types/types";
export const createContact = async (
  req: Request<{}, {}, Contact, {}>,
  res: Response
) => {
  try {
    const { firstName, lastName, email, phone, position } = req.body;
    const user = req.user as { email: string; id: string };
    const userId = user.id;
    const isExist: Contact | null = await uniqueEmailForUser(email, userId);
    if (isExist) {
      return res
        .status(400)
        .json({ message: "user already exist with this email" });
    }
    const id: string = uuidv4();
    const newData = { ...req.body, id, userId };
    const createdContact = await createSingleContact(newData);
    return res.status(201).json({ contact: createdContact });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const updateContact = async (
  req: Request<{ contactId: string }, {}, Contact, {}>,
  res: Response
) => {
  try {
    const contactId = req.params.contactId;
    const data = req.body;
    const user = req.user as { email: string; id: string };
    const userId = user.id;
    const getContactt: Contact = await getSingleContact(req.params.contactId);
    if (getContactt.email !== req.body.email) {
      const isExist: Contact | null = await uniqueEmailForUser(
        req.body.email,
        userId
      );
      if (isExist) {
        return res
          .status(400)
          .json({ message: "user already exist with this email" });
      }
    }
    const updatedContact: Contact = await updateSignleContact(contactId, data);
    return res.status(200).json({ updatedContact: updatedContact });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getContact = async (
  req: Request<{ contactId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const contactId: string = req.params.contactId;
    const singleContact: Contact | null = await getSingleContact(contactId);
    if (!singleContact) {
      return res.status(404).json({ message: "not found contact" });
    }
    return res.status(200).json({ singleContact: singleContact });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const deleteContact = async (
  req: Request<{ contactId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const contactId: string = req.params.contactId;
    const deleted = await deleteSignleContact(contactId);

    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
export const getAllContacts = async (
  req: Request<{}, {}, {}, QueryI>,
  res: Response
) => {
  try {
    const page = +req.query.page || DEFAULT_PAGE;
    const limit = +req.query.limit || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    const order = req.query.order || DEFAULT_ORDER;
    const sortBy = req.query.sortBy || DEFAULT_SORT_BY;
    const search = req.query.search || DEFAULT_SEARCH;

    const allContact: Contact[] | [] = await findAllContacts({
      skip: skip,
      take: limit,
      where: {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          { lastName: { contains: search, mode: "insensitive" } },
        ],
      },

      orderBy: {
        [sortBy as string]: order,
      },
    });
    return res.status(200).json(allContact);
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
export const getContactWithCompanys = async (
  req: Request<{ contactId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const contactId: string = req.params.contactId;
    const singleContact: Contact | null = await getSingleContact(contactId);
    if (!singleContact) {
      return res.status(404).json({ message: "not found contact" });
    }
    const contactWithCompanyArr = await getSingleContactWithCompanys(contactId);
    return res
      .status(200)
      .json({ contactWithCompanyArr: contactWithCompanyArr });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getcontactWithDeals = async (
  req: Request<{ contactId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const contactId: string = req.params.contactId;
    const singleContact: Contact | null = await getSingleContact(contactId);
    if (!singleContact) {
      return res.status(404).json({ message: "not found contact" });
    }
    const contactWithDealsArr = await getSingleContactWithDeals(contactId);
    return res.status(200).json({ contactWithDealsArr: contactWithDealsArr });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
