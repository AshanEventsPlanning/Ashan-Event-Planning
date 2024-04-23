import lifeCycleErrorHandlingMiddleware from "@/server/api/middleware/lifecycle-error-handling-middleware";
import { log } from "@/server/application/common/services/logging";
import calculateTablesChairsCommandHandler from "@/server/application/features/calculate/commands/calculate-tables-chairs-command-handler";
import { calculateDTO } from "@/server/domain/dtos/schemas";
import ValidationError from "@/server/domain/errors/validation-error";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestBody = calculateDTO.safeParse(body);

    let { userId } = getAuth(request);
    console.log(userId)
    if(!userId){
      userId = ""
    }

    if (!requestBody.success) {
      throw new ValidationError(requestBody.error.message);
    }
    // const userId ="user_2fUQY18szApq9Iyd69wp5KENQJc"
    const noOfArragements= await calculateTablesChairsCommandHandler({ ...requestBody.data, userId });

    return new Response(JSON.stringify(noOfArragements), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    log("SEVERE", error);
    return lifeCycleErrorHandlingMiddleware(error as Error);
  }
}