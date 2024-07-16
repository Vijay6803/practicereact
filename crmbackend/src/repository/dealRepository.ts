// export interface DealsI {
//     id: string,
//     title: string,
//     amount: number,
//     stage: "Prospecting" | "Qualification" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"
//     userId: string,
//     createdAt?: Date,
//     updatedAt?: Date
// }

import { Deals, PrismaClient } from "@prisma/client";
import {
  create,
  deleteById,
  findAll,
  findById,
  updateOne,
} from "./baseRepository";

const prisma = new PrismaClient();

export const createSingleDeal = async (data: Deals): Promise<Deals> => {
  const newDeal: Deals = await create(prisma.deals, data);
  return newDeal;
};

export const getSingleDeal = async (id: string): Promise<Deals> => {
  const singleDeal: Deals = await findById(prisma.deals, id);
  return singleDeal;
};

export const updateSignleDeal = async (
  id: string,
  data: Deals
): Promise<Deals> => {
  const updatedDeal: Deals = await updateOne(prisma.deals, id, data);
  return updatedDeal;
};

export const deleteSignleDeal = async (id: string): Promise<Deals> => {
  const deleted: Deals = await deleteById(prisma.deals, id);
  return deleted;
};

export const findAllDeals = async (
  options: Record<string, any> = {}
): Promise<Deals[]> => {
  const allDeals: Deals[] | [] = await findAll(prisma.deals, options);
  return allDeals;
};

export const getSingleDealWithCompanys = async (id: string) => {
  const dealsWithCompanysArr = await prisma.deals.findFirst({
    where: { id: id },
    include: {
      companydeal: true,
    },
  });
  return dealsWithCompanysArr;
};

export const getSingleDealWithContacts = async (id: string) => {
  const dealsWithContactsArr = await prisma.deals.findFirst({
    where: { id: id },
    include: {
      contactdeal: true,
    },
  });
  return dealsWithContactsArr;
};
