import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export const SearchInput = ({ value, onChange }: any) => (
  <TextField
    value={value}
    onChange={onChange}
    autoFocus
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      },
    }}
  />
)
