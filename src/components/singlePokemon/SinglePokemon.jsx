import usePokemons from "../../hooks/usePokemons";

import Spinner from "../spinner/Spinner";
import "./style.scss";

const SinglePokemon = () => {
  const { selectedPokemon, selectedPokemonLoadingStatus } = usePokemons();

  if (!selectedPokemon) {
    return null;
  }

  const { id, name, types, stats, sprite } = selectedPokemon;

  if (selectedPokemonLoadingStatus === "loading") {
    return (
      <div className="single-pokemon-container">
        <Spinner />
      </div>
    );
  }

  const renderStats = (stats) => {
    return stats.map((stat) => {
      return (
        <tr key={stat.name}>
          <td className="name">{stat.name}</td>
          <td>{stat.value}</td>
        </tr>
      );
    });
  };

  return (
    <div className="single-pokemon-container">
      <div className="single-pokemon-data">
        <div className="img-container">
          <img src={sprite} alt="id" />
        </div>
        <span className="single-pokemon-name">
          {name} <span>{`#${id}`}</span>
        </span>
        <table>
          <tbody>
            <tr key="types">
              <td>Types</td>
              <td>
                {types.map((type, index) =>
                  index !== types.length - 1 ? `${type}, ` : `${type}`
                )}
              </td>
            </tr>
            {renderStats(stats)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SinglePokemon;
