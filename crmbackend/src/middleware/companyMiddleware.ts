import { Request, Response, NextFunction } from "express"
import { CompanyI } from "../types/types"
import { getSingleCompany } from "../repository/companyRepository"

export const companyMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user as { id: string, email: string }

    try {
        
        const company: CompanyI = (await getSingleCompany(req.params.companyId)) as CompanyI

        if (!company) {
            return res.status(404).json({ message: "company not found" })
            // throw new Error("company not found")
        }

        else if (company.userId !== user.id) {
            return res.status(404).json({ message: "unauthorized" })
            // throw new Error("Unauthorized Route")
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "internal error" })
    }
}