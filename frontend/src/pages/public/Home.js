import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [itemId, setItemId] = useState("");
  const [itemType, setItemType] = useState("lost-item");
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!itemId) {
      setError("Please enter an item ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:3000/api/match/${itemType}/${itemId}`,
        {
          headers: {
            Authorization: "Bearer 14", // Replace with actual token
          },
        }
      );

      setMatches(response.data.matches || []);
      setHasSearched(true);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch matches. Please try again.");
      setMatches([]);
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const handleResetSearchResults = (value) => {
    setItemType(value);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
            Lost & Found Matching System
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find matches between lost and found items with our intelligent
            matching algorithm
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
            Search for Matches
          </h2>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="itemId" className="block text-gray-300 mb-2">
                  Item ID
                </label>
                <input
                  type="text"
                  id="itemId"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  placeholder="Enter item ID"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:w-1/3">
                <label htmlFor="itemType" className="block text-gray-300 mb-2">
                  Item Type
                </label>
                <select
                  id="itemType"
                  value={itemType}
                  onChange={(e) => handleResetSearchResults(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lost-item">Lost Item</option>
                  <option value="found-item">Found Item</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "Search Matches"}
              </button>
            </div>

            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </form>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-6 mb-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
              {matches.length > 0 ? "Matched Items" : "No Matches Found"}
            </h2>

            {matches.length === 0 && hasSearched && !isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No matching items found for your search criteria.
                </p>
                <p className="text-gray-500 mt-2">
                  Try a different item ID or type.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {matches.map((match, index) => {
                  // Handle different match structures based on item type
                  const lostItem =
                    itemType === "lost-item"
                      ? match.lostItem
                      : match.matches.lostItem;
                  const foundItem =
                    itemType === "lost-item"
                      ? match.matches.foundItem
                      : match.foundItem;
                  const score = match.matches?.score || match.score;

                  return (
                    <li
                      key={index}
                      className="p-4 bg-gray-800 rounded-xl shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-gray-200">
                        {lostItem.name} → {foundItem.name}
                      </h3>
                      <p className="text-gray-400">
                        <strong>Location:</strong> {lostItem.locationLost} →{" "}
                        {foundItem.locationFound}
                      </p>
                      <p className="text-gray-400">
                        <strong>Category:</strong> {lostItem.category}
                      </p>
                      <p className="text-gray-400">
                        <strong>Date:</strong>{" "}
                        {new Date(lostItem.dateLost).toDateString()} →{" "}
                        {new Date(foundItem.dateFound).toDateString()}
                      </p>

                      {/* Match Score */}
                      <div className="mt-2">
                        <p className="text-gray-300 font-medium">
                          Match Score: {score}%
                        </p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
