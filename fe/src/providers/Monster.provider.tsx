"use client"

import MonsterCard from "@/components/cards/MonsterCard"
import BasicSelector from "@/components/selectors/NormalSelector"
import { userMonsters } from "@/hooks/userMonsters"
import { Grid, Pagination } from "@mui/material"
import { ReactNode, useState } from "react"

export default function MonsterProvider(): ReactNode {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const { data, isLoading } = userMonsters(page, limit)

  if (isLoading) return <div>กำลังโหลด...</div>

  return (
    <div>
      <h1 className="text-2xl text-center py-4 font-bold">Monsters</h1>
      <Grid container spacing={2}>
        {data?.data.map((m) => (
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
        ))}
      </Grid>

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
