import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import PokemonService from "../../services/PokemonService";

const pokemonsAdapter = createEntityAdapter();
const initialState = pokemonsAdapter.getInitialState({
  pokemons: [],
  pokemonsLoadingStatus: "idle",
  nextPage: "",
  prevPage: "",
  selectedPokemon: null,
  selectedPokemonLoadingStatus: "idle",
});

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (nextPage) => {
    const { getPokemons } = PokemonService();
    return await getPokemons(nextPage);
  }
);

export const fetchPokemonById = createAsyncThunk(
  "pokemons/fetchPokemonById",
  async (id) => {
    const { getPokemonById } = PokemonService();
    return await getPokemonById(id);
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.pokemonsLoadingStatus = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.pokemonsLoadingStatus = "idle";
        state.nextPage = action.payload.next;
        state.prevPage = action.payload.prev;
        pokemonsAdapter.addMany(state, action.payload.pokemons);
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.pokemonsLoadingStatus = "error";
      })
      .addCase(fetchPokemonById.pending, (state) => {
        state.selectedPokemonLoadingStatus = "loading";
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.selectedPokemonLoadingStatus = "idle";
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state) => {
        state.selectedPokemonLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const {
  pokemonsFetching,
  pokemonsFetched,
  pokemonsFetchingError,
  pokemonsLoadingStatus,
  selectedPokemonLoadingStatus,
  pokemons,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;

export const { selectAll } = pokemonsAdapter.getSelectors(
  (state) => state.pokemons
);

export const filteredPokemonsSelector = createSelector(
  (state) => state.filters.activeFilters,
  selectAll,
  (filter, pokemons) => {
    if (filter.length === 0) {
      return pokemons;
    } else {
      return pokemons.filter((pokemon) =>
        filter.every((type) => pokemon.types.includes(type))
      );
    }
  }
);
