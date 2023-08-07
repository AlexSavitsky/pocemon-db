import { useDispatch } from "react-redux";
import { fetchPokemonById } from "../../redux/slice/pokemonsSlice";

import "./style.scss";

const PokemonsListItem = ({ data }) => {
  const dispatch = useDispatch();
  const { id, name, types, sprite } = data;

  const renderTypes = (types) => {
    return types.map((type) => (
      <div className={`pokemon-type ${type}`} key={type}>
        {type}
      </div>
    ));
  };

  const handleClick = (id) => {
    dispatch(fetchPokemonById(id));
  };

  return (
    <div className="pokemons-list-item" onClick={() => handleClick(id)}>
      <div className="sprite-container">
        <img src={sprite} alt={name} />
      </div>
      <span>{name}</span>
      <div className="pokemon-types-container">{renderTypes(types)}</div>
    </div>
  );
};

export default PokemonsListItem;
