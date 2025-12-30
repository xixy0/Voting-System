import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ElectionDetails() {
    const [elections, setElections] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchData, setSearchData] = useState("");
    const { isLoggedIn, role } = useAuth();

    useEffect(() => {
        filterData();
    }, [searchData])

    useEffect(() => {
        const getAllElections = async () => {
            try {
                const response = await api.get("/elections/getAll");
                setElections(response.data);
                setFiltered(response.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load election data");
            }
        };
        getAllElections();
    }, []);

    const filterData = () => {
        const search = searchData.toLowerCase().trim();

        const newData = elections.filter((election) =>
            election.electionTitle.toLowerCase().includes(search) ||
            election.electionStatus.toLowerCase().includes(search) ||
            election.electionId.toString().includes(search)
        );

        setFiltered(newData);
    };

    return (
        <div className="min-h-screen bg-amber-100 p-6">

            <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                Elections
            </h2>

            <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">

                {/* Search bar */}
                <input
                    type="text"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    placeholder="Search by election ID, Title or Status"
                    className="w-full border bg-white border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-800 focus:outline-none"
                />

                {/* Create Election button */}
                {isLoggedIn && role?.includes("ADMIN") && (
                    <div className="flex justify-center">
                        <Link to="/election/create">
                            <button className="bg-orange-800 hover:bg-orange-700 text-white text-sm font-semibold px-6 py-2 rounded-lg shadow transition duration-200">
                                Create Election
                            </button>
                        </Link>
                    </div>
                )}

            </div>

            {filtered.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((election) => (
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

                                {isLoggedIn && role?.includes("ADMIN") && (
                                    <Link to={`/election/update/${election.electionId}`}>
                                        <button className="border bg-orange-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition">
                                            Update Election
                                        </button>
                                    </Link>
                                )}

                                {isLoggedIn && role?.includes("ADMIN") && (
                                    <Link to={`/candidate/details/${election.electionId}`}>
                                        <button className="border bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-400 transition">
                                            Candidate details
                                        </button>
                                    </Link>
                                )}

                                {isLoggedIn && election.electionStatus === "COMPLETED" && (
                                    <Link to={`/election/results/${election.electionId}`}>
                                        <button className="border bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-500 transition">
                                            View Results
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
