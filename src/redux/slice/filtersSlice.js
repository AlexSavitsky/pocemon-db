import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import PokemonService from "../../services/PokemonService";

const filterAdapter = createEntityAdapter();
const initialState = filterAdapter.getInitialState({
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilters: [],
});

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { getAllTypes } = PokemonService();
    return await getAllTypes();
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        filterAdapter.setAll(state, action.payload);
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = filtersSlice.actions;

export default filtersSlice.reducer;

export const { selectAll } = filterAdapter.getSelectors(
  (state) => state.filters
);
