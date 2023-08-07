import { useSelector } from "react-redux";
import {
  selectAll,
  filteredPokemonsSelector,
} from "../redux/slice/pokemonsSlice";

const usePokemons = () => {
  const {
    pokemonsLoadingStatus,
    nextPage,
    prevPage,
    selectedPokemon,
    selectedPokemonLoadingStatus,
  } = useSelector((state) => state.pokemons);
  const pokemons = useSelector(selectAll);
  const filtredPokemons = useSelector(filteredPokemonsSelector);

  return {
    pokemonsLoadingStatus,
    pokemons,
    nextPage,
    prevPage,
    selectedPokemon,
    filtredPokemons,
    selectedPokemonLoadingStatus,
  };
};

export default usePokemons;
