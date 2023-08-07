import { useHttp } from "../hooks/http.hook";

const PokemonService = () => {
  const { request } = useHttp();

  const _apiBase = "https://pokeapi.co/api/v2/";

  const getPokemons = async (next) => {
    const res = await request(
      next ? next : `${_apiBase}pokemon/?limit=12`
    ).then();

    const tranformedPokemons = await Promise.all(
      res.results.map(async (data) =>
        _transformPokemon(await getPokemonByQuery(data.url))
      )
    );

    return {
      next: res.next,
      prev: res.previous,
      pokemons: tranformedPokemons,
    };
  };

  const getPokemonById = async (id) => {
    const res = await request(`${_apiBase}pokemon/${id}`);

    return _transformPokemon(res);
  };

  const getPokemonByQuery = async (query) => {
    const res = await request(query);

    return await res;
  };

  const getAllTypes = async () => {
    const res = await request(`${_apiBase}type?limit=999`);

    return res.results.map(_transformTypes);
  };

  const _transformPokemon = async (pokemon) => {
    const { id, name, moves, types, weight, stats, sprites } = pokemon;

    const transformedStats = stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));

    return {
      id,
      name,
      types: types.map((type) => type.type["name"]),
      stats: [
        ...transformedStats,
        { name: "weight", value: weight },
        { name: "moves", value: moves.length + 1 },
      ],
      sprite: sprites.front_default,
    };
  };

  const _transformTypes = (type) => {
    const { name } = type;

    return {
      id: name,
      label: name,
      name: name[0].toUpperCase() + name.slice(1),
    };
  };

  return {
    getPokemons,
    getPokemonById,
    getAllTypes,
  };
};

export default PokemonService;
