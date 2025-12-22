"use client"

import ToggleView from "@/components/buttons/ToggleView"
import MonsterCard from "@/components/cards/MonsterCard"
import BasicSelector from "@/components/selectors/NormalSelector"
import NormalTable from "@/components/tables/NormalTable"
import { useMonsters } from "@/hooks/useMonsters"
import { CircularProgress, Grid, IconButton, Pagination } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import SearchIcon from "@mui/icons-material/Search"
import { SearchInput } from "@/components/inputs/TextField"

export default function MonsterProvider(): ReactNode {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchDebounce] = useDebounce(searchTerm, 500)
  const [viewMode, setViewMode] = useState<string>("list")
  const { data } = useMonsters(page, limit, searchDebounce)

  useEffect(() => {
    setPage(1)
  }, [searchDebounce])

  return (
    <div>
      <h1 className="text-2xl text-center py-4 font-bold">Monsters</h1>
      <ToggleView mode={viewMode} setMode={setViewMode} />

      <SearchInput
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {viewMode === "list" ? (
        <NormalTable monsters={data?.data ?? []} />
      ) : (
        <Grid container spacing={2}>
          {data ? (
            data.data.map((m) => (
              <Grid key={m.name} size={4}>
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

      <Grid container spacing={2}>
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
          label="test"
          value={limit}
          setValue={setLimit}
          options={[
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </Grid>
    </div>
  )
}
