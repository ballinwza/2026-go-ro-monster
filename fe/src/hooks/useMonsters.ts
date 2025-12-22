import { monsterService } from "@/services/monsters/monstersService"
import { useQuery } from "@tanstack/react-query"

export function useMonsters(page: number, limit: number, name?: string) {
  return useQuery({
    queryKey: ["monsters", page, limit, name],
    queryFn: () => monsterService.getAll({ page, limit, name }),
  })
}
