import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchPokemons } from "../../redux/slice/pokemonsSlice";

import usePokemons from "../../hooks/usePokemons";

import PokemonsListItem from "../pokemonsListItem/PokemonsListItem";
import Spinner from "../spinner/Spinner";

import "./style.scss";

const PokemonsList = () => {
  const dispatch = useDispatch();
  const { pokemonsLoadingStatus, filtredPokemons, nextPage, pokemons } =
    usePokemons();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  const handleClick = () => {
    dispatch(fetchPokemons(nextPage));
  };

  if (pokemonsLoadingStatus === "loading" && pokemons.length === 0) {
    return (
      <div className="pokemons-list">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pokemons-list">
      <div className="pokemons-item-container">
        {filtredPokemons.map((pokemon) => (
          <PokemonsListItem data={pokemon} key={pokemon.id} />
        ))}
      </div>
      {pokemonsLoadingStatus === "loading" && pokemons.length > 0 ? (
        <Spinner />
      ) : null}
      <button
        disabled={pokemonsLoadingStatus === "idle" ? false : true}
        onClick={handleClick}
      >
        Load more
      </button>
    </div>
  );
};

export default PokemonsList;
