import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUsersByEmailOrUsername,
} from "../repository/userRepositoy";
import configObj from "../config/env.config";
import { User } from "@prisma/client";
const { v4: uuidv4 } = require("uuid");
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = uuidv4();
    const { username, email, password } = req.body as User;
    const isUserExistByEmail: User | null = await getUsersByEmailOrUsername(
      email
    );
    if (isUserExistByEmail) {
      // throw Error("email already exist")
      return res.status(400).json({ message: "email already exists" });
    }
    const iseUserExistByUsername: User | null = await getUsersByEmailOrUsername(
      username
    );
    if (iseUserExistByUsername) {
      return res.status(400).json({ message: "username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newData = { ...req.body, password: hashedPassword, id };
    const createdUser = await createUser(newData);
    return res.status(200).json(createdUser);
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { emailorusername, password } = req.body as {
      emailorusername: string;
      password: string;
    };
    const isUserExist: User | null = (await getUsersByEmailOrUsername(
      emailorusername
    )) as User;
    if (!isUserExist) {
      // throw Error("Invalid credentials")
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isMatch: boolean = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isMatch) {
      // throw Error("Invalid credentials")
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { id: isUserExist.id, email: isUserExist.email },
      `${configObj.JWT_SECRET}`
    );
    res.cookie("token", token);
    return res.status(200).json({ message: "login succesfully" });
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    res.clearCookie("token");
    return res.status(200).json("logout succesfully");
  } catch (error) {
    const e = error as Error;
    return res.status(500).json({ message: e.message });
  }
};
