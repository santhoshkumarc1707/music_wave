import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/searchSlice"; // Import the action

const Header = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query); // Get query from store
  const token = useSelector((state) => state.auth?.token);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/search?search=${encodeURIComponent(query)}`,
        config
      );

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results); // Expecting a structured response (e.g., { songs, albums })
        setError(null);
      } else {
        const errorData = await response.json();
        console.error("Search error:", errorData.error);
        setError(errorData.error || "Failed to fetch search results.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error while fetching search results.");
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    dispatch(setSearchQuery(value));  // Store query in Redux
    handleSearch(value); // Fetch search results as the user types
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center sm:w-full">
      <h1 className="text-xl font-semibold">Search</h1>

      <div className="relative sm:w-2/3 w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for Songs, Artists and Playlists"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {searchResults.length > 0 && (
          <div className="absolute top-16 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto w-full">
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100">
                  {result.name || "Unnamed"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
