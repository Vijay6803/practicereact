import { Contact, PrismaClient } from "@prisma/client";
import { ContactI } from "../types/types";
import {
  create,
  deleteById,
  findAll,
  findById,
  updateOne,
} from "./baseRepository";

const prisma = new PrismaClient();

export const createSingleContact = async (data: Contact): Promise<Contact> => {
  const newContact: Contact = await create(prisma.contact, data);
  return newContact;
};

export const getSingleContact = async (id: string): Promise<Contact> => {
  const singleContact: Contact = await findById(prisma.contact, id);
  console.log(singleContact, "getSingleContact----");

  return singleContact;
};

export const updateSignleContact = async (
  id: string,
  data: Contact
): Promise<Contact> => {
  const updatedContact: Contact = await updateOne(prisma.contact, id, data);
  return updatedContact;
};

export const deleteSignleContact = async (id: string): Promise<Contact> => {
  const deleted: Contact = await deleteById(prisma.contact, id);
  return deleted;
};

export const findAllContacts = async (
  options: Record<string, any> = {}
): Promise<Contact[]> => {
  const allContacts: Contact[] | [] = await findAll(prisma.contact, options);
  return allContacts;
};

export const uniqueEmailForUser = async (email: string, userId: string) => {
  const isExist: Contact | null = await prisma.contact.findFirst({
    where: {
      AND: [
        {
          email: email,
        },
        { userId: userId },
      ],
    },
  });

  return isExist;
};

export const getSingleContactWithCompanys = async (id: string) => {
  const contactWithCompnaysArr = await prisma.contact.findFirst({
    where: { id: id },
    include: { companycontact: true },
  });
  return contactWithCompnaysArr;
};

export const getSingleContactWithDeals = async (id: string) => {
  const contactWithCompnaysArr = await prisma.contact.findFirst({
    where: { id: id },
    include: { contactdeal: true },
  });
  return contactWithCompnaysArr;
};
