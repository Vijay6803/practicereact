import {
  PrismaClient,
  CompanyContact,
  CompanyDeal,
  ContactDeal,
} from "@prisma/client";

const prisma = new PrismaClient();

export const createCompanyContact = async (data: CompanyContact) => {
  return await prisma.companyContact.create({ data: data });
};

export const createCompanyDeal = async (data: CompanyDeal) => {
  return await prisma.companyDeal.create({ data: data });
};
export const createContactDeal = async (data: ContactDeal) => {
  return await prisma.contactDeal.create({ data: data });
};
