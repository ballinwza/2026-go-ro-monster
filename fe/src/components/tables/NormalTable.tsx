import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { ReactNode } from "react"
import { Monster } from "@/services/monsters/model"

interface Props {
  monsters: Monster[]
}

function createData(
  name: string,
  image: string,
  level: number,
  hitPoint: number,
  experiance: number,
  jobExperiance: number,
  flee: number,
  hit: number,
  race: string,
  property: string,
  size: string,
  minAtk: number,
  maxAtk: number,
  def: number,
  mdef: number
) {
  return {
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

export default function NormalTable(props: Props): ReactNode {
  const rows =
    props.monsters &&
    props.monsters.map(
      ({
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
      }) =>
        createData(
          name,
          image ?? "",
          level ?? 0,
          hitPoint ?? 0,
          experiance ?? 0,
          jobExperiance ?? 0,
          flee ?? 0,
          hit ?? 0,
          race ?? "",
          property ?? "",
          size ?? "",
          minAtk ?? 0,
          maxAtk ?? 0,
          def ?? 0,
          mdef ?? 0
        )
    )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">LV</TableCell>
            <TableCell align="left">Race</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Property</TableCell>
            <TableCell align="left">HP</TableCell>
            <TableCell align="left">Flee</TableCell>
            <TableCell align="left">Hit</TableCell>
            <TableCell align="left">Atk</TableCell>
            <TableCell align="left">Def</TableCell>
            <TableCell align="left">Mdef</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${index}-${row.name}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">
                <div className="flex justify-center items-center h-full">
                  <img src={row.image} alt={row.name} className="h-[70%]" />
                </div>
              </TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.race}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.property}</TableCell>
              <TableCell align="right">{row.hitPoint}</TableCell>
              <TableCell align="right">{row.flee}</TableCell>
              <TableCell align="right">{row.hit}</TableCell>
              <TableCell align="right">
                {row.atk.minAtk} - {row.atk.maxAtk}
              </TableCell>
              <TableCell align="right">{row.def}</TableCell>
              <TableCell align="right">{row.mdef}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
