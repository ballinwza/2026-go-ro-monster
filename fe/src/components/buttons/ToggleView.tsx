import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { ReactNode } from "react"
import ViewListIcon from "@mui/icons-material/ViewList"
import ViewModuleIcon from "@mui/icons-material/ViewModule"

interface Props {
  mode: string
  setMode: (value: string) => void
}

export default function ToggleView(props: Props): ReactNode {
  const handleOnChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    props.setMode(newAlignment)
  }

  return (
    <div className="flex justify-end">
      <ToggleButtonGroup value={props.mode} exclusive onChange={handleOnChange}>
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
