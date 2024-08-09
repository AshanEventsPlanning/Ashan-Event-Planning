import { GetArrangementsDTO } from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getArrangements = async () => {
    const query = `*[_type=="arrangement" && status == "Available"]{_id, name, chairspertable,status}`;
    return GetArrangementsDTO.array().parse(await staticClient.fetch(query));
}
