import {NextRequest} from "next/server";
import editTableCommandHandler from "@/server/application/features/table/commands/edit-table-command-handler";
import { EditTableDTO } from "@/server/domain/dtos/schemas";
import ValidationError from "@/server/domain/errors/validation-error";

export async function PUT(
  request: NextRequest,
  {params: {_id}}: { params: { _id: string } }
) {
  const body = await request.json();
  const requestBody = EditTableDTO.safeParse(body);
  if (!requestBody.success) {
    throw new ValidationError(requestBody.error.message);
  }

  await editTableCommandHandler({...requestBody.data});

  return new Response(null, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}