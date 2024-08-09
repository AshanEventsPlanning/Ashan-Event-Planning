import { z } from "zod";
import { createOrderDTO, EditChairDTO, EditTableDTO } from "@/server/domain/dtos/schemas";
import api from "@/lib/api/base";

export async function createNewOrder(data: z.infer<typeof createOrderDTO>,
                                     chair: z.infer<typeof EditChairDTO>,
                                     table: z.infer<typeof EditTableDTO>,
                                     chairCount: number,
                                     tableCount: number) {
  try {
    if (chair.stock > chairCount && table.stock > tableCount) {
      await api.post("/api/order", { json: data });

      let updatedChair = { ...chair };
      updatedChair.stock = chair.stock - chairCount;

      let updatedTable = { ...table };
      updatedTable.stock = table.stock - tableCount;

      await api.put(`/api/chair/${chair._id}`, { json: updatedChair });
      await api.put(`/api/table/${table._id}`, { json: updatedTable });

      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    throw new Error("Failed to create new order");
  }
}
