import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { DealsI, QueryI } from "../types/types";
import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_SEARCH,
  DEFAULT_SORT_BY,
} from "../constant/constant";
import {
  createSingleDeal,
  deleteSignleDeal,
  findAllDeals,
  getSingleDeal,
  getSingleDealWithCompanys,
  getSingleDealWithContacts,
  updateSignleDeal,
} from "../repository/dealRepository";
import { Deals } from "@prisma/client";

export const createDeal = async (
  req: Request<{}, {}, Deals, {}>,
  res: Response
) => {
  try {
    const user = req.user as { id: string; email: string };
    const id: string = uuidv4();
    const userId = user.id;
    const data = req.body;
    let newData;
    if (data.closeDate) {
      newData = { ...data, userId, id, closeDate: new Date(data.closeDate) };
    }
    newData = { ...data, userId, id };
    const createdDeal = await createSingleDeal(newData);

    return res.status(201).json({ createdDeal: createdDeal });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const updateDeal = async (
  req: Request<{ dealId: string }, {}, Deals, {}>,
  res: Response
) => {
  try {
    const dealid = req.params.dealId;
    const updatedDeal = await updateSignleDeal(dealid, req.body);
    console.log(updatedDeal);
    return res.status(201).json({ updatedDeal: updatedDeal });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getDeal = async (
  req: Request<{ dealId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const dealId: string = req.params.dealId;
    const singleDeal: Deals | null = await getSingleDeal(dealId);
    if (!singleDeal) {
      return res.status(404).json({ message: "not found deal" });
    }
    return res.status(200).json({ singleDeal: singleDeal });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
export const deleteDeal = async (
  req: Request<{ dealId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const dealId: string = req.params.dealId;
    const singleDeal: Deals | null = await getSingleDeal(dealId);
    if (!singleDeal) {
      return res.status(404).json({ message: "not found deal" });
    }
    const deletedDeal = await deleteSignleDeal(dealId);
    return res.status(200).json({ message: "deal deleted" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getAllDeals = async (
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

    const allcompany: Deals[] | [] = await findAllDeals({
      skip: skip,
      take: limit,
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      orderBy: {
        [sortBy as string]: order,
      },
    });
    return res.status(200).json(allcompany);
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getDealWithCompanys = async (
  req: Request<{ dealId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const dealId: string = req.params.dealId;
    const singleDeal: Deals | null = await getSingleDeal(dealId);
    if (!singleDeal) {
      return res.status(404).json({ message: "not found deal" });
    }

    const dealWithCompanysArr = await getSingleDealWithCompanys(dealId);
    return res.status(200).json({ dealWithCompanysArr: dealWithCompanysArr });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getDealWithContacts = async (
  req: Request<{ dealId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const dealId: string = req.params.dealId;
    const singleDeal: Deals | null = await getSingleDeal(dealId);
    if (!singleDeal) {
      return res.status(404).json({ message: "not found deal" });
    }

    const dealWithContactsArr = await getSingleDealWithContacts(dealId);
    return res.status(200).json({ dealWithContactsArr: dealWithContactsArr });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
