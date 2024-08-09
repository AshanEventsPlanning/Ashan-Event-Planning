import { z } from "zod";

export const GetChairsDTO = z.object({
  _id: z.string(),
  name: z.string(),
  length: z.number(),
  width: z.number(),
  price: z.number(),
  stock: z.number(),
  status: z.string(),
  image: z.string().array()
});
export const EditChairDTO = z
  .object({
    _id: z.string(),
    name: z.string().min(2).max(100),
    length: z.number().int().nonnegative(),
    width: z.number().int().nonnegative(),
    price: z.number().int().nonnegative(),
    stock: z.number().int().nonnegative(),
    status: z.string(),
    image: z.string().array().nonempty({ message: "Please upload at least 1 image" })
  })
  .strict();
export const GetTablesDTO = z.object({
  _id: z.string(),
  name: z.string(),
  length: z.number(),
  width: z.number(),
  price: z.number(),
  stock: z.number(),
  status: z.string(),
  image: z.string().array()
});
export const EditTableDTO = z
  .object({
    _id: z.string(),
    name: z.string().min(2).max(100),
    length: z.number().int().nonnegative(),
    width: z.number().int().nonnegative(),
    price: z.number().int().nonnegative(),
    stock: z.number().int().nonnegative(),
    status: z.string(),
    image: z.string().array().nonempty({ message: "Please upload at least 1 image" })
  })
  .strict();
export const GetArrangementsDTO = z.object({
  _id: z.string(),
  name: z.string(),
  chairspertable: z.number(),
  status: z.string()
});


export const createOrderDTO = z.object({
  chair: z.string(),
  table: z.string(),
  noOfChairs: z.number(),
  noOfCTables: z.number(),
  totalPrice: z.number(),
  location: z.string(),
  date: z.string(),
  time: z.string(),
  status: z.string()
});