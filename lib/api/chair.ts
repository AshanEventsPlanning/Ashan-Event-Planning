import { GetChairsDTO } from "@/server/domain/dtos/schemas";
import { staticClient } from "@/server/infrastructure/clients/sanity";

export const getChairs = async () => {
    const query = `*[_type == "chair" && status == "Available" ] {_id,name,length,width,price,stock,status,image}`;
    return GetChairsDTO.array().parse(await staticClient.fetch(query));
}