import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {};
main()
  .catch((e) => {
    console.log("error inside prisma");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
export default prisma;
