import { z } from 'zod'

export const GetChairsDTO = z.object({
    _id: z.string(),
    name: z.string(),
    length: z.number(),
    width: z.number(),
    image: z.string().array(),
})

export const GetTablesDTO = z.object({
    _id: z.string(),
    name: z.string(),
    length: z.number(),
    width: z.number(),
    image: z.string().array(),
})

export const GetArrangementsDTO = z.object({
    _id: z.string(),
    name: z.string(),
    chairspertable: z.number(),
})

export const calculateDTO = z.object({
    chair: z.string(),
    table: z.string(),
    arrangement: z.string(),
    length: z.number(),
    width: z.number(),
    location: z.string(),
    date: z.string(),
    time: z.string(),
})