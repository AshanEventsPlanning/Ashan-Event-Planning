import { GetChairsDTO} from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getChairs = async () => {
    const query = `*[_type=="chair"]{_id, name, length, width, image}`;
    const data = GetChairsDTO.array().parse(await staticClient.fetch(query));
    return data;
}