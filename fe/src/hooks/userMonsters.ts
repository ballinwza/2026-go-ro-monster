import { monsterService } from "@/services/monsters/monstersService"
import { useQuery } from "@tanstack/react-query"

export function userMonsters(page: number, limit: number) {
  return useQuery({
    queryKey: ["monsters", page, limit],
    queryFn: () => monsterService.getAll({ page, limit }),
  })
}
