import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AllCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        filterCandidates();
    }, [searchData]);

    useEffect(() => {
        const getAllCandidates = async () => {
            try {
                const response = await api.get("/candidates/getAll");
                setCandidates(response.data);
                setFilteredData(response.data);
            } catch (err) {
                toast.error("Error fetching candidates");
                console.error(err);
            }
        };
        getAllCandidates();
    }, []);

    const filterCandidates = () => {
        const search = searchData.toLowerCase().trim();

        const newData = candidates.filter(
            (candidate) =>
                candidate.candidateName.toLowerCase().includes(search) ||
                candidate.candidateParty.toLowerCase().includes(search)
        );

        setFilteredData(newData);
    };

    return (
        <div className="min-h-screen bg-amber-100 p-6">

            {/* Page Title */}
            <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                All Candidates
            </h2>

            {/* Search Bar */}
            <div className="w-full max-w-4xl mx-auto mb-8">
                <input
                    type="text"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    placeholder="Search by candidate name or party"
                    className="w-full border bg-white border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-800 focus:outline-none"
                />
            </div>

            {/* Candidate List */}
            {filteredData.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map((candidate) => (
                        <div
                            key={candidate.candidateId}
                            className="bg-white border border-orange-200 rounded-lg p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                {candidate.candidateName}
                            </h3>

                            <p className="text-sm text-orange-700 font-medium mb-2">
                                 Candidate Party : {candidate.candidateParty}
                            </p>

                            <p className="text-sm text-slate-600 mb-3">
                               Description : {candidate.candidateDescription}
                            </p>

                           
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-slate-600">
                    No candidates found
                </p>
            )}
        </div>
    );
}

export default AllCandidates;
