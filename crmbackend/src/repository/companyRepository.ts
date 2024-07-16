import { Company, PrismaClient } from "@prisma/client";
import {
  deleteById,
  findAll,
  findById,
  updateOne,
  create,
} from "./baseRepository";

const prisma = new PrismaClient();

export const createSignleCompany = async (data: Company): Promise<Company> => {
  const newCompany: Company = await create(prisma.company, data);
  return newCompany;
};

export const updateSingleCompany = async (
  data: Company,
  id: string
): Promise<Company> => {
  const updatedCompany = await updateOne(prisma.company, id, data);
  return updatedCompany;
};

export const deleteSingleCompany = async (id: string) => {
  const deleted = await deleteById(prisma.company, id);
  return deleted;
};

export const findAllCompany = async (
  options: Record<string, any> = {}
): Promise<Company[]> => {
  return await findAll(prisma.company, options);
};

export const getSingleCompany = async (id: string) => {
  const singleCompany: Company | null = await findById(prisma.company, id);
  return singleCompany;
};

export const compnayWithContacts = async (id: string) => {
  const companyWithContactsarr = await prisma.company.findFirst({
    where: { id: id },
    include: { companycontact: true },
  });
  return companyWithContactsarr;
};

export const companyWithDeals = async (id: string) => {
  const companyWithDealssarr = await prisma.company.findFirst({
    where: { id: id },
    include: { companydeal: true },
  });
  return companyWithDealssarr;
};
