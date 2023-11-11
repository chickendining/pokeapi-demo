const PokemonCard = ({ pokemon }) => {
  const extractIdFromUrl = (url) => {
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    return id.padStart(3, "0"); // Pad with zeros to make it three digits
  };

  const pokemonId = extractIdFromUrl(pokemon.url);

  return (
    <div className="card bg-white rounded-lg border shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h5 className="text-lg font-semibold">{pokemonId}</h5>
      <h5 className="text-lg font-semibold">{pokemon.name}</h5>
    </div>
  );
};

export default PokemonCard;
