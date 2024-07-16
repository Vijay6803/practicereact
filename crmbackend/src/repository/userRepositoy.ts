// import { Prisma, PrismaClient } from "@prisma/client";
// import BaseRepository from "./baseRepository";
// import { User } from "@prisma/client";
// import prisma from "../../prisma/script";
// import bcrypt from "bcryptjs"
// import { UserI } from "../types/types";

import { PrismaClient, User } from "@prisma/client";

import { create } from "./baseRepository";
const prisma = new PrismaClient();
// export default class UserRepository extends BaseRepository<User>{
//     constructor() {
//         super(prisma.user)
//     }
//     createUser(practicedata: UserI): Promise<UserI> {
//         const data = this.modelClient.create({ data: practicedata })
//         return data;
//     }
//     async getUsersByEmailOrUsername(emailorusername: string): Promise<UserI> {
//         const data = await this.modelClient.findFirst({
//             where: {
//                 OR: [
//                     {
//                         email: emailorusername
//                     },
//                     { username: emailorusername },
//                 ]
//             }
//         })
//         return data;
//     }

// }
const model = "user";

export const createUser = async (data: User) => {
  return await create(prisma.user, data);
};

export const getUsersByEmailOrUsername = async (emailorusername: string) => {
  const data = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: emailorusername,
        },
        { username: emailorusername },
      ],
    },
  });
  return data;
};
