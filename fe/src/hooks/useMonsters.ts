import {
  monsterService,
  MonsterSortOption,
} from "@/services/monsters/monstersService"
import { useQuery } from "@tanstack/react-query"

export function useMonsters(
  page: number,
  limit: number,
  name?: string,
  sortBy?: MonsterSortOption,
  order?: 1 | -1
) {
  return useQuery({
    queryKey: ["monsters", page, limit, name, sortBy, order],
    queryFn: () => monsterService.getAll({ page, limit, name, sortBy, order }),
  })
}
