import Joi from "joi";
import { Request, Response, NextFunction } from "express"
export const userchema = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(6).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,16}$')).required()
})

export const createUSerValidation = (req: Request, res: Response, next: NextFunction) => {
    const valid = userchema.validate(req.body);
    if (valid.error != null) {
        return res.json({ message: valid.error.details[0].message });
    }
    next();

}