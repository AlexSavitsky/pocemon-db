import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import usePokemons from "../../hooks/usePokemons";

import {
  activeFilterChanged,
  fetchFilters,
  selectAll,
} from "../../redux/slice/filtersSlice";

import "./style.scss";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Filter = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filters = useSelector(selectAll);
  const { activeFilters } = useSelector((state) => state.filters);

  const { filtredPokemons } = usePokemons();

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const handleChange = (event) => {
    dispatch(activeFilterChanged(event.target.value));
  };

  const clearFilters = () => {
    dispatch(activeFilterChanged([]));
  };

  return (
    <div className="filter">
      <FormControl className="form-control" sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">Type</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={activeFilters}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={value}></Chip>
              ))}
            </Box>
          )}
        >
          {filters.map((item) => (
            <MenuItem
              key={item.id}
              value={item.label}
              style={getStyles(item, activeFilters, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button className="filter-clear-btn" onClick={clearFilters}>
        Clear
      </button>
    </div>
  );
};

export default Filter;
