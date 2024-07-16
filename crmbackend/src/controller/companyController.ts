import { Request, Response, NextFunction } from "express";

import { QueryI } from "../types/types";
import {
  companyWithDeals,
  compnayWithContacts,
  createSignleCompany,
  deleteSingleCompany,
  findAllCompany,
  getSingleCompany,
  updateSingleCompany,
} from "../repository/companyRepository";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";
import { Company, Prisma } from "@prisma/client";
import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_SEARCH,
  DEFAULT_SORT_BY,
} from "../constant/constant";
import { PrismaClient } from "@prisma/client/extension";
export const createCompany = async (
  req: Request<{}, {}, Company, {}>,
  res: Response
) => {
  try {
    const id: string = uuidv4();
    const user = req.user as { id: string; email: string };
    const userId = user.id;
    const newData = { ...req.body, userId, id };
    const createdCompany = await createSignleCompany(newData);
    return res.status(200).json(createdCompany);
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getAllCompany = async (
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

    const allcompany: Company[] | [] = await findAllCompany({
      skip: skip,
      take: limit,
      where: {
        name: {
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
export const updateCompany = async (
  req: Request<{ companyId: string }, {}, Company, {}>,
  res: Response
) => {
  try {
    const data = req.body;
    const updatedCompany = await updateSingleCompany(
      data,
      req.params.companyId
    );
    return res.status(200).json({ message: "company updated succesfully" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getCompany = async (
  req: Request<{ companyId: string }, {}, Company, {}>,
  res: Response
) => {
  try {
    const companyId: string = req.params.companyId;
    const singleCompany: Company | null = await getSingleCompany(companyId);
    if (!singleCompany) {
      return res.status(404).json({ message: "company not found" });
    }
    return res.status(200).json({ singleCompany });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
export const deleteCompany = async (
  req: Request<{ companyId: string }, {}, Company, {}>,
  res: Response
) => {
  try {
    const deletedCompany = await deleteSingleCompany(req.params.companyId);
    console.log(deletedCompany);
    return res.status(200).json({ message: "company deleted succesfully" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getCompanyWithContacts = async (
  req: Request<{ companyId: string }, {}, Company, {}>,
  res: Response
) => {
  try {
    const companyId: string = req.params.companyId;
    const singleCompany: Company | null = await getSingleCompany(companyId);
    if (!singleCompany) {
      return res.status(404).json({ message: "company not found" });
    }
    const companyWithContactsarr = await compnayWithContacts(companyId);
    console.log(companyWithContactsarr);

    return res
      .status(200)
      .json({ companyWithContactsarr: companyWithContactsarr });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const getCompanyWithDeals = async (
  req: Request<{ companyId: string }, {}, Company, {}>,
  res: Response
) => {
  try {
    const companyId: string = req.params.companyId;
    const singleCompany: Company | null = await getSingleCompany(companyId);
    if (!singleCompany) {
      return res.status(404).json({ message: "company not found" });
    }
    const companyWithDealsArr = await companyWithDeals(companyId);
    console.log(companyWithDealsArr);

    return res.status(200).json({ companyWithDealsArr: companyWithDealsArr });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
