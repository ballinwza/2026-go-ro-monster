import axiosInstance from "@/lib/axios"
import { Monster } from "./model"
import { ApiResponse, Pagination } from "../cores/model"

interface GetMonstersParams {
  page?: number
  limit?: number
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
