import { calculateDTO } from "@/server/domain/dtos/schemas";
import { z } from "zod";
import api from "./base";

export const calculateChairsTables = async (data : z.infer<typeof calculateDTO>) => {
    const res = await api.post("/api/calculate", { json: data });
    const noOfArragements = await res.json()
    return noOfArragements;
  };