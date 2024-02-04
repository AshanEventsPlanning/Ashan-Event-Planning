import { GetTablesDTO} from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getTables = async () => {
    const query = `*[_type=="table"]{_id, name, length, width, image}`;
    const data = GetTablesDTO.array().parse(await staticClient.fetch(query));
    return data;
}