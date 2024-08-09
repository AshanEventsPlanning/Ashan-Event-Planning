import { GetTablesDTO } from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getTables = async () => {
    const query = `*[_type == "table" && status == "Available" ] {_id,name,length,width,price,stock,status,image}`;
    return GetTablesDTO.array().parse(await staticClient.fetch(query));
}