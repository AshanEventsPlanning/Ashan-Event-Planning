import { GetChairsDTO, GetTablesDTO, GetArrangementsDTO} from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

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