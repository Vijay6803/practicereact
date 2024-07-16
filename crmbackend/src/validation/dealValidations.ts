import Joi from "joi";
import { Request, Response, NextFunction } from "express";
export const dealSchema = Joi.object().keys({
  title: Joi.string().min(3).max(40).required(),
  amount: Joi.number().required(),
  stage: Joi.string()
    .valid(
      "Prospecting",
      "Qualification",
      "Proposal",
      "Negotiation",
      "Closed Won",
      "Closed Lost"
    )
    .optional(),
  closeDate: Joi.date().greater("now").optional(),
});

export const createDealValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valid = dealSchema.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};
