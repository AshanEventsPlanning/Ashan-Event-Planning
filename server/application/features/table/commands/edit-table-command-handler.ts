import {dynamicClient} from "@/server/infrastructure/clients/sanity";
import {z} from "zod";
import { EditTableDTO } from "@/server/domain/dtos/schemas";

type EditTableCommand = z.infer<typeof EditTableDTO>;

export default async function editTableCommandHandler(
    command: EditTableCommand
) {
    const {_id,name,length, width,price,stock, image} = command;
    const table = {
        _id,
        _type: "table",
        name,
        length,
        width,price,stock,
        image
    };
    const publishedCloth = await dynamicClient.createOrReplace(table);
}
