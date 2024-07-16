import { error } from "console"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authmiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.cookies.token) {
            const token: string = req.cookies.token;
            const user = await jwt.verify(token, `${process.env.JWT_SECRET}`)
            req.user = user
            next()
        }
        else {
            // throw new Error("please login")
            return res.json(400).json({ message: "please login" })
        }
    }
    catch (error) {
        return res.json(400).json({ message: "please login" })
    }
}