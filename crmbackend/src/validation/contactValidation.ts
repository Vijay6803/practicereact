import Joi from "joi";
import { Request, Response, NextFunction } from "express"
export const contactSchema = Joi.object().keys({
    firstName: Joi.string().min(2).max(40).required(),
    lastName: Joi.string().min(5).max(40).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).optional(),
    position: Joi.string().optional()
})
export const updateContactSchema = Joi.object().keys({
    firstName: Joi.string().min(2).max(40).optional(),
    lastName: Joi.string().min(5).max(40).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).optional(),
    position: Joi.string().optional()
})
export const createContactValidation = (req: Request, res: Response, next: NextFunction) => {
    const valid = contactSchema.validate(req.body);
    if (valid.error != null) {
        return res.json({ message: valid.error.details[0].message });
    }
    next();

}

export const updateContactValidation = (req: Request, res: Response, next: NextFunction) => {
    const valid = updateContactSchema.validate(req.body);
    if (valid.error != null) {
        return res.json({ message: valid.error.details[0].message });
    }
    next();

}
