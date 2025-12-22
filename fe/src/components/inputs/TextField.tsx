import { TextField } from "@mui/material"

export const SearchInput = ({ value, onChange }: any) => (
  <TextField value={value} onChange={onChange} autoFocus />
)
