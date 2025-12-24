import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Fragment, ReactNode } from "react"
import { Monster } from "@/services/monsters/model"
import { capitalize } from "@mui/material"
import { MonsterSortOption } from "@/services/monsters/monstersService"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

interface Props {
  monsters: Monster[]
  sortBy: MonsterSortOption
  setSortBy: (sortBy: MonsterSortOption) => void
  order: 1 | -1
  setSortOrder: (sortOrder: 1 | -1) => void
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
          mdef
        )
    )

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65dvh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {createTableHeadCellWithFilter(
              props.setSortBy,
              props.order,
              props.setSortOrder,
              props.sortBy
            )}
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
              key={`item-${index}-${row.name}`}
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

function createData(
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

const createTableHeadCell = (
  label: string,
  setSortBy: (value: string) => void,
  order: 1 | -1,
  setOrder: (sortOrder: 1 | -1) => void,
  sortBy: MonsterSortOption
) => {
  return (
    <TableCell
      align="left"
      onClick={() => {
        setSortBy(label.toLowerCase())
        setOrder(order === 1 ? -1 : 1)
      }}
      sx={{ cursor: "pointer" }}
      className="hover:bg-blue-100 transition-colors"
    >
      <div className="flex justify-between gap-1">
        {capitalize(label)}
        {sortBy.toString() === label ? (
          order === 1 ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )
        ) : null}
      </div>
    </TableCell>
  )
}

const createTableHeadCellWithFilter = (
  onClick: (value: MonsterSortOption) => void,
  order: 1 | -1,
  setSortOrder: (sortOrder: 1 | -1) => void,
  sortBy: MonsterSortOption
) => {
  return (
    <Fragment>
      {createTableHeadCell(
        MonsterSortOption.Name,
        () => onClick(MonsterSortOption.Name),
        order,
        setSortOrder,
        sortBy
      )}
      <TableCell align="left">Image</TableCell>
      {createTableHeadCell(
        MonsterSortOption.Level,
        () => onClick(MonsterSortOption.Level),
        order,
        setSortOrder,
        sortBy
      )}
      {createTableHeadCell(
        MonsterSortOption.Race,
        () => onClick(MonsterSortOption.Race),
        order,
        setSortOrder,
        sortBy
      )}
      {createTableHeadCell(
        MonsterSortOption.Size,
        () => onClick(MonsterSortOption.Size),
        order,
        setSortOrder,
        sortBy
      )}
      {createTableHeadCell(
        MonsterSortOption.Property,
        () => onClick(MonsterSortOption.Property),
        order,
        setSortOrder,
        sortBy
      )}
      {/* {createTableHeadCell(MonsterSortOption.Level, () => {
        onClick(MonsterSortOption.Level)
        setSortOrder(order === 1 ? -1 : 1)
      })}
      {createTableHeadCell(MonsterSortOption.Race, () => {
        onClick(MonsterSortOption.Race)
        setSortOrder(order === 1 ? -1 : 1)
      })}
      {createTableHeadCell(MonsterSortOption.Size, () => {
        onClick(MonsterSortOption.Size)
        setSortOrder(order === 1 ? -1 : 1)
      })}
      {createTableHeadCell(MonsterSortOption.Property, () => {
        onClick(MonsterSortOption.Property)
        setSortOrder(order === 1 ? -1 : 1)
      })} */}
    </Fragment>
  )
}
