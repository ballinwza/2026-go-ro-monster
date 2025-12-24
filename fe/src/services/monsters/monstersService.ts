import axiosInstance from "@/lib/axios"
import { Monster } from "./model"
import { ApiResponse } from "../cores/model"

interface GetMonstersParams {
  page?: number
  limit?: number
  name?: string
  sortBy?: MonsterSortOption
  order?: 1 | -1
}

export enum MonsterSortOption {
  Name = "name",
  Level = "level",
  Race = "race",
  Property = "property",
  Size = "size",
}

interface MonsterResponse {
  name: string
  image?: string
  level?: number
  hitPoint?: number
  experiance?: number
  jobExperiance?: number
  flee?: number
  hit?: number
  race?: string
  property?: string
  size?: string
  minAtk?: number
  maxAtk?: number
  def?: number
  mdef?: number
}

export const monsterService = {
  getAll: async (params: GetMonstersParams) => {
    const response = await axiosInstance.get<ApiResponse<MonsterResponse[]>>(
      "api/v1/monsters/all",
      {
        params,
      }
    )
    const res = response.data

    return {
      data: res.data.map(mappingToDomain),
      status: res.status,
      pagination: res.pagination,
    }
  },
}

const mappingToDomain = (entity: MonsterResponse): Monster => {
  return {
    name: entity.name,
    image: entity.image ?? "",
    race: entity.race ?? "",
    property: entity.property ?? "",
    size: entity.size ?? "",
    level: entity.level ?? 0,
    hitPoint: Intl.NumberFormat().format(entity.hitPoint ?? 0),
    experiance: Intl.NumberFormat().format(entity.experiance ?? 0),
    jobExperiance: Intl.NumberFormat().format(entity.jobExperiance ?? 0),
    flee: Intl.NumberFormat().format(entity.flee ?? 0),
    hit: Intl.NumberFormat().format(entity.hit ?? 0),
    minAtk: Intl.NumberFormat().format(entity.minAtk ?? 0),
    maxAtk: Intl.NumberFormat().format(entity.maxAtk ?? 0),
    def: Intl.NumberFormat().format(entity.def ?? 0),
    mdef: Intl.NumberFormat().format(entity.mdef ?? 0),
  }
}
