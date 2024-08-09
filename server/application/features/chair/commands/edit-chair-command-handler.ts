import {dynamicClient} from "@/server/infrastructure/clients/sanity";
import {z} from "zod";
import { EditChairDTO } from "@/server/domain/dtos/schemas";

type EditChairCommand = z.infer<typeof EditChairDTO>;

export default async function editChairCommandHandler(
    command: EditChairCommand
) {
    const {_id, name, length, width, price, stock,status, image} = command;
    const chair = {
        _id,
        _type: "chair",
        name,
        length,
        width, price, stock,status,

        image
    };
    const publishedCloth = await dynamicClient.createOrReplace(chair);
}
