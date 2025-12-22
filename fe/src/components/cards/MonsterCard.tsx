import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Fragment, ReactNode } from "react"
import { Grid } from "@mui/material"

interface Props {
  name: string
  image?: string
  level?: number
  hitPoint?: number
  experiance?: number
  jobExperiance?: number
  flee?: number
  hit?: number
  race?: string
  property?: string
  size?: string
  minAtk?: number
  maxAtk?: number
  def?: number
  mdef?: number
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
            ? `${Intl.NumberFormat().format(
                props.minAtk
              )} - ${Intl.NumberFormat().format(props.maxAtk)}`
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

      <CardActions>
        <Button size="small">ADD</Button>
      </CardActions>
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
