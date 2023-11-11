// const PokemonCard = ({ pokemon }) => {
//   const extractIdFromUrl = (url) => {
//     const parts = url.split("/");
//     const id = parts[parts.length - 2];
//     return id.padStart(3, "0"); // Pad with zeros to make it three digits
//   };

//   const pokemonId = extractIdFromUrl(pokemon.url);

//   return (
//     <div className="card bg-white rounded-lg border shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
//       <h5 className="text-lg font-semibold">{pokemonId}</h5>
//       <h5 className="text-lg font-semibold">{pokemon.name}</h5>
//     </div>
//   );
// };

// export default PokemonCard;

import { useEffect, useState } from "react";

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching Pokémon details: ", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  const extractIdFromUrl = (url) => {
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    return id.padStart(3, "0");
  };

  const pokemonId = extractIdFromUrl(pokemon.url);

  return (
    <div className="card bg-white rounded-lg border shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {pokemonDetails && pokemonDetails.sprites && (
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto"
        />
      )}
      <h5 className="text-lg font-semibold">{pokemonId}</h5>
      <h5 className="text-lg font-semibold">{pokemon.name}</h5>
    </div>
  );
};

export default PokemonCard;
