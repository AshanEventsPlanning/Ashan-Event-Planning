import prisma from "../clients/prisma";
import { User } from ".prisma/client";

type OrderParams = {
  chair: string|null,
  table: string|null,
  location: string,
  date: string,
  time: string,
  noOfChairs: number,
  noOfCTables: number,
  totalPrice: number,
  userId: string
};

export async function createOrder(params: OrderParams) {
  console.log("params",params)
  await prisma.order.create({
    data: {
      chair:params.chair?params.chair:"",
      table:params.table?params.table:"",
      location:params.location?params.location:"",
      date:params.date?params.date:"",
      time:params.time?params.time:"",
      noOfChairs:params.noOfChairs?params.noOfChairs:0,
      noOfCTables:params.noOfCTables?params.noOfCTables:0,
      totalPrice:params.totalPrice?params.totalPrice:0,
      userId:params.userId
    }
  });
}