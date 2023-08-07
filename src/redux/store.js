import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slice/pokemonsSlice";
import filtersReducer from "./slice/filtersSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    filters: filtersReducer,
  },
});
