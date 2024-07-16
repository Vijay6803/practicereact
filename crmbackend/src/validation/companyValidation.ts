import Joi from "joi";
import { Request, Response, NextFunction } from "express"
export const companychema = Joi.object().keys({
    name: Joi.string().min(5).max(40).required(),
    address: Joi.string().min(10).max(400).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).optional(),
    website: Joi.string().uri().optional()
})

export const createCompanyValidation = (req: Request, res: Response, next: NextFunction) => {
    const valid = companychema.validate(req.body);
    if (valid.error != null) {
        return res.json({ message: valid.error.details[0].message });
    }
    next();

}
// export const handleValidation = (req: Request, res: Response, next: NextFunction,schema:string)=>{
//     const valid = companychema.validate(req.body);
//     if (valid.error != null) {
//         return res.json({ message: valid.error.details[0].message });
//     }
//     next();
// }
