import axiosInstance from "@/lib/axios"
import { Monster } from "./model"
import { ApiResponse } from "../cores/model"

interface GetMonstersParams {
  page?: number
  limit?: number
  name?: string
}

export const monsterService = {
  getAll: async (params: GetMonstersParams) => {
    const response = await axiosInstance.get<ApiResponse<Monster[]>>(
      "/monsters/all",
      {
        params,
      }
    )

    return response.data
  },
}
