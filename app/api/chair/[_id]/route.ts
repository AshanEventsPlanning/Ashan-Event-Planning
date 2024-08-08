import {NextRequest} from "next/server";
import { EditChairDTO } from "@/server/domain/dtos/schemas";
import ValidationError from "@/server/domain/errors/validation-error";
import editChairCommandHandler from "@/server/application/features/chair/commands/edit-chair-command-handler";


export async function PUT(
  request: NextRequest,
  {params: {_id}}: { params: { _id: string } }
) {
  const body = await request.json();
  const requestBody = EditChairDTO.safeParse(body);
  if (!requestBody.success) {
    throw new ValidationError(requestBody.error.message);
  }

  await editChairCommandHandler({...requestBody.data});

  return new Response(null, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}