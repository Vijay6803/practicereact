// import { type PrismaClient } from "@prisma/client/extension";
import { Prisma, PrismaClient } from "@prisma/client/extension";
// const DEFAULT_ORDER_BY = {
//     createdAt: "desc"
// }
// const MAX_RECORDS_LIMIT = 100

// export default abstract class BaseRepository<A> {
//     constructor(protected modelClient: PrismaClient) { }
//     getAll(options: Record<string, any> = {}): Promise<Array<A>> {
//         if (!options.orderBy) {
//             options.orderBy = DEFAULT_ORDER_BY;
//         }
//         if (!options.take || options.take > MAX_RECORDS_LIMIT) {
//             options.take = MAX_RECORDS_LIMIT
//         }
//         options = { ...options }
//         return this.modelClient.findMany(options)
//     }
//     getById(id: string): Promise<A> {
//         return this.modelClient.findFirst({
//             where: {
//                 id: id

//             }
//         })
//     }

//     deletebyid(id: number): Promise<A> {
//         return this.modelClient.destroy(
//             {
//                 where: {
//                     id: id
//                 },

//             }
//         )
//     }
// }

export const create = async <T>(
    modelClient: PrismaClient,
    data: Record<string, any> = {}
): Promise<T> => {
    return modelClient.create({ data: data });
};



export const findAll = async<T>(modelClient: PrismaClient, options: Record<string, any> = {}): Promise<T[]> => {
    return modelClient.findMany(options)
}

export const findById = async<T>(model: PrismaClient, id: string) => {
    return await model.findUnique({ where: { id: id } })
}
export const deleteById = async<T>(model: PrismaClient, id: string) => {
    return await model.delete({ where: { id: id } })
}

export const updateOne = async<T>(model: PrismaClient, id: string, data: Record<string, any> = {}) => {
    return await model.update({ where: { id: id }, data: data })
}
