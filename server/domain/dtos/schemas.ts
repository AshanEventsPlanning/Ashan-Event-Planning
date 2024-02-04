import { z } from 'zod'

export const GetChairsDTO = z.object({
    _id: z.string(),
    name: z.string(),
    length: z.number(),
    width: z.number(),
    image: z.string(),
})

export const GetTablesDTO = z.object({
    _id: z.string(),
    name: z.string(),
    length: z.number(),
    width: z.number(),
    image: z.string(),
})