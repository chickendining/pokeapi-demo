import { useEffect, useState } from "react";
import PokemonCard from "./components/Card";

export default function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllPokemons = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118"); // Adjust the limit based on the total number of Pokémon
      const data = await res.json();
      setAllPokemons(data.results);
    } catch (error) {
      console.error("Error fetching all Pokémon: ", error);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredPokemons = searchQuery
    ? allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPokemons;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokemon List</h1>
      {/*  */}
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Search Pokemon"
        onChange={handleSearchChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex justify-center my-4">
        <button
          className={`font-bold py-2 px-4 rounded-l mr-2 ${
            currentPage > 1
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          onClick={handlePrevClick}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <button
          className={`font-bold py-2 px-4 rounded-r ml-2 ${
            currentPage * itemsPerPage < filteredPokemons.length
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          onClick={handleNextClick}
          disabled={currentPage * itemsPerPage >= filteredPokemons.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
