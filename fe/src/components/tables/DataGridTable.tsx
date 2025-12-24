import { Monster } from "@/services/monsters/model"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ReactNode } from "react"

interface Props {
  monsters: Monster[]
}

function createData(
  id: string,
  name: string,
  image: string,
  level: number,
  hitPoint: string,
  experiance: string,
  jobExperiance: string,
  flee: string,
  hit: string,
  race: string,
  property: string,
  size: string,
  minAtk: string,
  maxAtk: string,
  def: string,
  mdef: string
) {
  return {
    id,
    name,
    image,
    level,
    hitPoint,
    experiance,
    jobExperiance,
    flee,
    hit,
    race,
    property,
    size,
    atk: { minAtk, maxAtk },
    def,
    mdef,
  }
}

export default function DataGridTable(props: Props): ReactNode {
  const rows =
    props.monsters &&
    props.monsters.map(
      (
        {
          name,
          image,
          level,
          hitPoint,
          experiance,
          jobExperiance,
          flee,
          hit,
          race,
          property,
          size,
          minAtk,
          maxAtk,
          def,
          mdef,
        },
        index
      ) =>
        createData(
          index.toString() + 1,
          name,
          image ?? "",
          level ?? 0,
          hitPoint ?? 0,
          experiance ?? 0,
          jobExperiance ?? 0,
          flee ?? 0,
          hit ?? 0,
          race ?? 0,
          property ?? 0,
          size ?? 0,
          minAtk ?? 0,
          maxAtk ?? 0,
          def ?? 0,
          mdef ?? 0
        )
    )

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "No.", width: 60 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      editable: true,
      align: "center",
      renderCell: (params) => (
        <div className="flex justify-center items-center h-full">
          <img src={params.value} alt={params.row.name} className="h-[70%]" />
        </div>
      ),
    },
    {
      field: "level",
      headerName: "Level",
      type: "number",
      editable: true,
    },
    {
      field: "hitPoint",
      headerName: "HP",
      type: "number",
      editable: true,
    },
    {
      field: "experiance",
      headerName: "Exp",
      type: "number",

      editable: true,
    },
    {
      field: "jobExperiance",
      headerName: "Job Exp",
      type: "number",
      editable: true,
    },
    {
      field: "flee",
      headerName: "Flee",
      type: "number",
      editable: true,
    },
    {
      field: "hit",
      headerName: "Hit",
      type: "number",
      editable: true,
    },
    {
      field: "race",
      headerName: "Race",

      editable: true,
    },
    {
      field: "property",
      headerName: "Property",
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",
      editable: true,
    },
    {
      field: "atk",
      headerName: "Atk",
      sortable: false,
      type: "number",
      valueGetter: (_, row) =>
        `${row.atk.minAtk || ""}-${row.atk.maxAtk || ""}`,
    },
    {
      field: "def",
      headerName: "Def",
      type: "number",
      editable: true,
    },
    {
      field: "mdef",
      headerName: "Mdef",
      type: "number",
      editable: true,
    },
  ]

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
