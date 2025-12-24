import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Fragment, ReactNode } from "react"
import { Grid } from "@mui/material"

interface Props {
  name: string
  image: string
  level: number
  hitPoint: string
  experiance: string
  jobExperiance: string
  flee: string
  hit: string
  race: string
  property: string
  size: string
  minAtk: string
  maxAtk: string
  def: string
  mdef: string
}

export default function MonsterCard(props: Props): ReactNode {
  const renderAllMonsterDetails = () => {
    return (
      <Fragment>
        {monsterItem("Level", props.level)}
        {monsterItem("Race", props.race)}
        {monsterItem("Size", props.size)}
        {monsterItem("Property", props.property)}
        {monsterItem("Exp", props.experiance)}
        {monsterItem("Job Exp", props.jobExperiance)}
        {monsterItem("HP", props.hitPoint)}
        {monsterItem("Flee", props.flee)}
        {monsterItem("Hit", props.hit)}
        {monsterItem(
          "ATK",
          props.minAtk && props.maxAtk
            ? `${props.minAtk} - ${props.maxAtk}`
            : undefined
        )}
        {monsterItem("DEF", props.def)}
        {monsterItem("MDEF", props.mdef)}
      </Fragment>
    )
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: 150, backgroundSize: "auto" }}
        image={props.image}
        title={props.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Grid container spacing={0.4}>
          {renderAllMonsterDetails()}
        </Grid>
      </CardContent>
    </Card>
  )
}

const monsterItem = (label: string, value?: string | number) => {
  if (!value) return null

  let result: string = value.toString()

  if (typeof value === "number") {
    result = Intl.NumberFormat().format(value)
  }

  return (
    <Grid size={12}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {label} : {result}
      </Typography>
    </Grid>
  )
}
