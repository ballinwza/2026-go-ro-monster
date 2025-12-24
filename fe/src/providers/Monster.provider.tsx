"use client"

import ToggleView from "@/components/buttons/ToggleView"
import MonsterCard from "@/components/cards/MonsterCard"
import BasicSelector from "@/components/selectors/NormalSelector"
import NormalTable from "@/components/tables/NormalTable"
import { useMonsters } from "@/hooks/useMonsters"
import { CircularProgress, Grid, Pagination } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { SearchInput } from "@/components/inputs/TextField"
import { MonsterSortOption } from "@/services/monsters/monstersService"

export default function MonsterProvider(): ReactNode {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchDebounce] = useDebounce(searchTerm, 500)
  const [viewMode, setViewMode] = useState<string>("list")
  const [sortBy, setSortBy] = useState<MonsterSortOption>(
    MonsterSortOption.Level
  )
  const [sortOrder, setSortOrder] = useState<1 | -1>(1)
  const { data } = useMonsters(page, limit, searchDebounce, sortBy, sortOrder)

  useEffect(() => {
    setPage(1)
  }, [searchDebounce])

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl text-center py-4 font-bold">Monsters</h1>
      <div className="flex justify-between items-center mb-4">
        <SearchInput
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <ToggleView mode={viewMode} setMode={setViewMode} />
      </div>

      {viewMode === "list" ? (
        <NormalTable
          monsters={data?.data ?? []}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          order={sortOrder}
        />
      ) : (
        <Grid container spacing={2}>
          {data ? (
            data.data.map((m, index) => (
              <Grid key={`card-${index}-${m.name}`} size={4}>
                <MonsterCard
                  key={m.name}
                  name={m.name}
                  image={m.image}
                  level={m.level}
                  hitPoint={m.hitPoint}
                  race={m.race}
                  experiance={m.experiance}
                  jobExperiance={m.jobExperiance}
                  size={m.size}
                  property={m.property}
                  minAtk={m.minAtk}
                  maxAtk={m.maxAtk}
                  def={m.def}
                  mdef={m.mdef}
                  flee={m.flee}
                  hit={m.hit}
                />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      )}

      <div className="flex justify-end items-center gap-4 mt-4">
        <Pagination
          count={data?.pagination.totalPage}
          defaultPage={1}
          page={page}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          onChange={(_, value) => setPage(value)}
        />

        <BasicSelector
          value={limit}
          setValue={setLimit}
          options={[
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </div>
    </div>
  )
}
