import Header from "./components/header/Header";
import Filter from "./components/filter/Filter";
import PokemonsList from "./components/pokemonsList/PokemonsList";
import SinglePokemon from "./components/singlePokemon/SinglePokemon";

import "./style.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Filter />
      <div className="pokemons-container">
        <PokemonsList />
        <SinglePokemon />
      </div>
    </div>
  );
}

export default App;
