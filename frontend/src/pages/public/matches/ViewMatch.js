import { useEffect, useState } from "react";
import axios from "axios";

const ViewMatch = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/match/lost-item/9", {
        headers: {
          Authorization: "Bearer 1", // Replace with actual token
        },
      })
      .then((res) => setMatches(res.data.matches)) // Now it's an array!
      .catch((err) => console.error(err));
  }, []);

  if (!matches || matches.length === 0) {
    return <p className="text-center text-gray-400">No matches found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
        Matched Lost & Found Items
      </h2>

      <ul className="space-y-4">
        {matches.map((match, index) => (
          <li key={index} className="p-4 bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-200">
              {match.lostItem.name} → {match.matches.foundItem.name}
            </h3>
            <p className="text-gray-400">
              <strong>Location:</strong> {match.lostItem.locationLost} →{" "}
              {match.matches.foundItem.locationFound}
            </p>
            <p className="text-gray-400">
              <strong>Category:</strong> {match.lostItem.category}
            </p>
            <p className="text-gray-400">
              <strong>Date:</strong>{" "}
              {new Date(match.lostItem.dateLost).toDateString()} →{" "}
              {new Date(match.matches.foundItem.dateFound).toDateString()}
            </p>

            {/* Match Score */}
            <div className="mt-2">
              <p className="text-gray-300 font-medium">
                Match Score: {match.matches.score}%
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${match.matches.score}%` }}
                ></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMatch;