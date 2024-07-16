import Joi from "joi";
import { Request, Response, NextFunction } from "express";
export const lineItemsSchema = Joi.object().keys({
  dealId: Joi.string().required(),
  ProductName: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  price: Joi.number().required().required(),
});

export const createLinetemsValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valid = lineItemsSchema.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};
