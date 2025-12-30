import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function CastVote() {
    const [hasVoted, setHasVoted] = useState(false);
    const [candidateId, setCandidateId] = useState("");
    const [candidates, setCandidates] = useState([]);
    const { electionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const response = await api.get(
                    `/elections/${electionId}/candidates`
                );
                setCandidates(response.data);
            } catch (err) {
                toast.error("Failed to load candidates");
            }
        };
        getCandidates();
    }, [electionId]);

    useEffect(() => {
        const checkVote = async () => {
            try {
                const response = await api.get(
                    `/votes/elections/${electionId}/has-voted`
                );
                setHasVoted(response.data.hasVoted);
            } catch (err) {
                toast.error("Error checking voting status");
            }
        };
        checkVote();
    }, [electionId]);

    const handleVote = async (e) => {
        e.preventDefault();

        if (!candidateId) {
            toast.error("Please select a candidate");
            return;
        }

        try {
            await api.post("/votes", { electionId, candidateId });
            toast.success("Vote cast successfully");
            setHasVoted(true);
        } catch (err) {
            toast.error(err.response?.data || "Error casting vote");
        }
    };

    if (hasVoted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
                <div className="w-full max-w-md bg-white border border-orange-200 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        Vote Already Cast
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                        You have already voted in this election.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-800 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-amber-100 px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white border border-orange-200 rounded-lg p-8">

             
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Cast Your Vote
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Select one candidate
                    </p>
                </div>

                <form onSubmit={handleVote} className="space-y-6">

                 
                    <div className="grid gap-4 sm:grid-cols-2">
                        {candidates.map((candidate) => (
                            <label
                                key={candidate.candidateId}
                                className={`cursor-pointer border rounded-lg p-4 transition
                                ${
                                    candidateId === candidate.candidateId
                                        ? "border-orange-600 bg-orange-50"
                                        : "border-slate-300 hover:border-orange-400"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Radio */}
                                    <input
                                        type="radio"
                                        name="candidate"
                                        value={candidate.candidateId}
                                        checked={candidateId === candidate.candidateId}
                                        onChange={() =>
                                            setCandidateId(candidate.candidateId)
                                        }
                                        className="mt-1 accent-orange-600"
                                    />

                                    {/* Candidate Info */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-800">
                                            {candidate.candidateName}
                                        </h4>
                                        <p className="text-sm text-orange-700 font-medium">
                                            {candidate.candidateParty}
                                        </p>
                                        <p className="text-sm text-slate-600 mt-1">
                                            {candidate.candidateDescription}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-700 text-white rounded-md font-medium hover:bg-orange-800 transition"
                        >
                            Confirm Vote
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CastVote;
