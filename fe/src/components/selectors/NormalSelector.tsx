import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

interface Props {
  options: { value: number; label: string }[]
  value: number
  setValue: (value: number) => void
}

export default function BasicSelector(props: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(Number(event.target.value))
  }

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <Select
          id="table-selector-limit"
          value={props.value.toString()}
          onChange={handleChange}
          size="small"
          sx={{ textAlign: "center" }}
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
