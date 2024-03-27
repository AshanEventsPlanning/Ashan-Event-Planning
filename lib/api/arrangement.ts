import { GetArrangementsDTO} from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getArrangements = async () => {
    const query = `*[_type=="arrangement"]{_id, name, chairspertable}`;
    const data = GetArrangementsDTO.array().parse(await staticClient.fetch(query));
    return data;
}

export async function getArrangementByName( arrangement: string) {
    const query = `*[_type=="arrangement" && name=="${arrangement}"]{_id, name, chairspertable}`;
    const data = GetArrangementsDTO.array().parse(await staticClient.fetch(query))[0];
    return data;
}
