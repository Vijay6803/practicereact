import { LineItems, PrismaClient } from "@prisma/client";
import {
  create,
  deleteById,
  findAll,
  findById,
  updateOne,
} from "./baseRepository";

const prisma = new PrismaClient();

export const createSingleLineItem = async (
  data: LineItems
): Promise<LineItems> => {
  const newDeal: LineItems = await create(prisma.lineItems, data);
  return newDeal;
};

export const getSingleLineItem = async (id: string): Promise<LineItems> => {
  const singleDeal: LineItems = await findById(prisma.lineItems, id);
  return singleDeal;
};

export const updateSingleLineItem = async (
  id: string,
  data: LineItems
): Promise<LineItems> => {
  const updatedDeal: LineItems = await updateOne(prisma.lineItems, id, data);
  return updatedDeal;
};

export const deleteSingleLineItem = async (id: string): Promise<LineItems> => {
  const deleted: LineItems = await deleteById(prisma.lineItems, id);
  return deleted;
};

export const getAllLineItems = async (
  options: Record<string, any> = {}
): Promise<LineItems[]> => {
  const allLineItems: LineItems[] | [] = await findAll(
    prisma.lineItems,
    options
  );
  return allLineItems;
};
