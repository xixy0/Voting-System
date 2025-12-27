import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ElectionDetails() {
    const [elections, setElections] = useState([]);
    const { isLoggedIn, role } = useAuth();
    useEffect(() => {
        const getAllElections = async () => {
            try {
                const response = await api.get("/elections/getAll");
                setElections(response.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load election data");
            }
        };
        getAllElections();
    }, []);

    return (
        <div className="min-h-screen bg-amber-100 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                    Elections
                </h2>

                {isLoggedIn && role?.includes("ADMIN") && (
                    <Link to={"/election/create"}>
                        <button className="bg-orange-800 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition duration-200">
                            Create Election</button></Link>)}
            </div>

            {elections.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {elections.map((election) => (
                        <div
                            key={election.electionId}
                            className="bg-white border border-orange-200 rounded-lg p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                {election.electionTitle}
                            </h3>

                            <p className="text-sm text-slate-600 mb-2">
                                {election.electionDescription}
                            </p>

                            <div className="text-sm text-slate-700 space-y-1">
                                <p>
                                    <span className="font-medium text-orange-700">Start:</span>{" "}
                                    {election.electionStartTime}
                                </p>
                                <p>
                                    <span className="font-medium text-orange-700">End:</span>{" "}
                                    {election.electionEndTime}
                                </p>
                                <p>
                                    <span className="font-medium text-orange-700">Status:</span>{" "}
                                    {election.electionStatus}
                                </p>
                                <p>
                                    <span className="font-medium text-orange-700">
                                        Candidates:
                                    </span>{" "}
                                    {election.candidateCount}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-3">
                                {isLoggedIn && role?.includes("VOTER") && election.electionStatus === "ACTIVE" && (
                                    <Link to={`/vote/${election.electionId}`}>
                                        <button className="bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-800 transition">
                                            Cast Vote
                                        </button>
                                    </Link>
                                )}

                                {isLoggedIn && election.electionStatus === "COMPLETED" && (
                                    <Link to={`/election/results/${election.electionId}`}>
                                        <button className="border border-green-700 text-green-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-300 transition">
                                            View Results
                                        </button>
                                    </Link>
                                )}

                                {isLoggedIn && role?.includes("ADMIN")  && (
                                    <Link to={`/election/update/${election.electionId}`}>
                                        <button className="border border-slate-700 text-slate-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300 transition">
                                            Update Election
                                        </button>
                                    </Link>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-slate-600">No elections available</p>
            )}
        </div>
    );
}

export default ElectionDetails;
