import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

interface Props {
  label: string
  options: { value: number; label: string }[]
  value: number
  setValue: (value: number) => void
}

export default function BasicSelector(props: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(Number(event.target.value))
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          //   labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value.toString()}
          //   label={props.label}
          onChange={handleChange}
        >
          {props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
