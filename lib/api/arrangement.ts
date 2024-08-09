import { GetArrangementsDTO } from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getArrangements = async () => {
    const query = `*[_type=="arrangement"]{_id, name, chairspertable}`;
    return GetArrangementsDTO.array().parse(await staticClient.fetch(query));
}
