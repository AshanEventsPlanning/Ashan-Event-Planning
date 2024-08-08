import { createOrder } from "@/server/infrastructure/repositories/order-repository";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { createOrderDTO } from "@/server/domain/dtos/schemas";
import ValidationError from "@/server/domain/errors/validation-error";
import { log } from "@/server/application/common/services/logging";
import lifeCycleErrorHandlingMiddleware from "@/server/api/middleware/lifecycle-error-handling-middleware";

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    const requestBody = createOrderDTO.safeParse(body);

    let { userId } = getAuth(request);
    console.log(userId)
    if(!userId){
      userId = ""
    }

    if (!requestBody.success) {
      throw new ValidationError(requestBody.error.message);
    }
   await createOrder({ ...requestBody.data, userId });

    return new Response("Order Placed Successfully", {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    log("SEVERE", error);
    return lifeCycleErrorHandlingMiddleware(error as Error);
  }
}