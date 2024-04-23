import { GetChairsDTO, GetTablesDTO, GetArrangementsDTO} from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";
import prisma from "../clients/prisma";

export async function getChairByName( chair: string) {
    const query = `*[_type=="chair" && name=="${chair}"]{_id, name, length, width, image}`;
    const data = GetChairsDTO.array().parse(await staticClient.fetch(query))[0];
    return data;
}

export async function getTableByName( table: string) {
    const query = `*[_type=="table" && name=="${table}"]{_id, name, length, width, image}`;
    const data = GetTablesDTO.array().parse(await staticClient.fetch(query))[0];
    return data;
}

export async function getArrangementByName( arrangement: string) {
    const query = `*[_type=="arrangement" && name=="${arrangement}"]{_id, name, chairspertable}`;
    const data = GetArrangementsDTO.array().parse(await staticClient.fetch(query))[0];
    return data;
}

type OrderParams = {
    chair: string,
    table: string,
    arrangement: string,
    length: number;
    width: number,
    location: string,
    date: string,
    time : string,
    noOfArrangements : number,
    userId: string
  };

export async function createOrder( params : OrderParams ) {
    const Order = await prisma.order.create({
        data: {
            chair: params.chair,
            table: params.table,
            arrangement: params.arrangement,
            length: params.length,
            width: params.width,
            location: params.location,
            date: params.date,
            time : params.time,
            noOfArrangements : params.noOfArrangements,
            userId: params.userId
        },
      });
      return Order.noOfArrangements;
}