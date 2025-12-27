import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ElectionResults() {
  const { electionId } = useParams();
  const [results, setResults] = useState([]);
  const{isLoggedIn} = useAuth();

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await api.get(
          `/results/elections/${electionId}`
        );
        setResults(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to get results");
      }
    };
    getResults();
  }, [electionId]);

  return (
    <div className="min-h-screen bg-amber-100 p-6">
      <h3 className="text-2xl font-semibold text-slate-800 text-center mb-6">
        Election Results
      </h3>

      {isLoggedIn && results.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {results.map((result, index) => (
            <div
              key={result.candidateId}
              className="bg-white border border-orange-200 rounded-lg p-5 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-slate-800">
                  {index + 1}. {result.candidateName}
                </p>
                <p className="text-sm text-slate-600">
                  {result.candidateParty}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-700">
                  Votes:{" "}
                  <span className="font-semibold">
                    {result.voteCount}
                  </span>
                </p>
                <p className="text-sm text-orange-700 font-semibold">
                  {result.percentage.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-600">
          No results available
        </p>
      )}
    </div>
  );
}

export default ElectionResults;
