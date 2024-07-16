import { Request, Response } from "express";
import {
  createCompanyContact,
  createCompanyDeal,
  createContactDeal,
} from "../repository/associationRepository";
import { Company, Contact, Deals } from "@prisma/client";
import { getSingleCompany } from "../repository/companyRepository";
import { getSingleContact } from "../repository/contactRepository";
import { getSingleDeal } from "../repository/dealRepository";

export const createCompanyContactAssociation = async (
  req: Request<{ companyId: string; contactId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    console.log(req.params);
    const isExistCompany: Company | null = await getSingleCompany(
      req.params.companyId
    );
    console.log(isExistCompany);
    if (!isExistCompany) {
      return res.status(404).json({ message: "company not found" });
    }
    const isExistContact: Contact | null = await getSingleContact(
      req.params.contactId
    );
    if (!isExistContact) {
      return res.status(404).json({ message: "contact not found" });
    }
    const companyContact = await createCompanyContact({
      companyId: req.params.companyId,
      contactId: req.params.contactId,
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const createCompanyDealAssociation = async (
  req: Request<{ companyId: string; dealId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const isExistCompany: Company | null = await getSingleCompany(
      req.params.companyId
    );
    if (!isExistCompany) {
      return res.status(404).json({ message: "company not found" });
    }
    const isExistDeal: Deals | null = await getSingleDeal(req.params.dealId);
    if (!isExistDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    const companyDeal = await createCompanyDeal({
      companyId: req.params.companyId,
      dealId: req.params.dealId,
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const createContactDealAssociation = async (
  req: Request<{ contactId: string; dealId: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    const isExistContact: Contact | null = await getSingleContact(
      req.params.contactId
    );
    if (!isExistContact) {
      return res.status(404).json({ message: "contact not found" });
    }
    const isExistDeal: Deals | null = await getSingleDeal(req.params.dealId);
    if (!isExistDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    const contactDeal = await createContactDeal({
      contactId: req.params.contactId,
      dealId: req.params.dealId,
    });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
