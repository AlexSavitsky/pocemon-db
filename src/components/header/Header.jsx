import React, { useState, useEffect } from "react";

import "./style.scss";

const Header = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    playAnimation();
  }, []);

  const playAnimation = () => {
    const pokemonsData = {
      common: [
        "pidgey",
        "spearow",
        "nidoran-f",
        "nidoran-m",
        "rattata",
        "sentret",
        "oddish",
        "geodude",
        "mareep",
      ],

      uncommon: [
        "ekans",
        "sandshrew",
        "bellsprout",
        "caterpie",
        "weedle",
        "paras",
        "zubat",
        "venonat",
        "vulpix",
        "jigglypuff",
        "ledyba",
        "flaafy",
        "clefairy",
        "spinarak",
        "marill",
        "hoppip",
        "growlithe",
        "phanpy",
        "cubone",
        "poliwag",
        "eevee",
        "abra",
      ],

      rare: ["beedrill", "butterfree", "pidgeotto", "dratini", "miltank"],

      flying: "beedrill butterfree pidgeotto ledyba zubat",
    };

    const getY = (pokemon) => {
      if (pokemonsData.flying.indexOf(pokemon) >= 0) {
        return (Math.random() * 3 + 11).toFixed(2);
      } else {
        return (Math.random() * 3 + 9).toFixed(2);
      }
    };

    const getZ = (y) => {
      return Math.floor((20 - y) * 100);
    };

    const randomPokemon = (type) => {
      return pokemonsData[type][
        Math.floor(Math.random() * pokemonsData[type].length)
      ];
    };

    const makePokemon = (type) => {
      const xDelay = type === "common" ? 0 : type === "uncommon" ? 0.4 : 0.8;

      const delay = (Math.random() * 1.7 + xDelay).toFixed(3);

      const pokemon = randomPokemon(type);
      const bottom = getY(pokemon);
      const z = getZ(bottom);

      return (
        <i
          key={pokemon + z + bottom + delay}
          className={`sprite pokemon move ${pokemon}`}
          style={{
            WebkitAnimationDelay: `${delay}s`,
            bottom: `${bottom}%`,
            zIndex: `${z}`,
          }}
        >
          <i style={{ delay }}></i>
        </i>
      );
    };

    const commons = Math.floor(Math.random() * 25) + 25;
    const uncommons = Math.floor(Math.random() * 5) + 8;
    const rares = 4;

    const horde = [];

    for (let i = 0; i < commons; i++) {
      horde.push(makePokemon("common"));
    }

    for (let i = 0; i < uncommons; i++) {
      horde.push(makePokemon("uncommon"));
    }

    for (let i = 0; i < rares; i++) {
      horde.push(makePokemon("rare"));
    }

    setPokemons(horde);
  };

  return (
    <div className="header">
      <div className="img-container">
        <img src="http://fc00.deviantart.net/fs70/i/2012/308/0/b/__hd___pokemon_logo___hd___by_peetzaahhh2010-d5k08gz.png" />
      </div>

      <div className="pokonami">
        <i className="sprite ash">
          <i></i> <div className="quote exclamation"></div>
        </i>
        <i className="sprite pokemon pikachu">
          <i></i> <div className="quote love"></div>
        </i>
        <i className="sprite pokemon togepi move">
          <i></i> <div className="quote love"></div>
        </i>
        <div className="pokemons">{pokemons}</div>
      </div>
    </div>
  );
};

export default Header;
