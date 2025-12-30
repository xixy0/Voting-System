import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

function CandidateDetails() {
    const { electionId } = useParams();
    const { role } = useAuth();
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const response = await api.get(`/candidates/${electionId}`);
                setCandidates(response.data);
            } catch (err) {
                toast.error("Error fetching candidates");
                console.error(err);
            }
        };
        getCandidates();
    }, [electionId]);

    const handleDelete = async (candidateId) => {
        try {
            await api.delete(`/candidates/${candidateId}`);
            toast.success("Candidate Deleted");
            setCandidates(prev =>
                prev.filter(candidate => candidate.candidateId !== candidateId)
            );
        } catch (err) {
            toast.error("Error in deleting candidate");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-amber-100 px-4 py-10">
            <div className="max-w-5xl mx-auto bg-white border border-orange-200 rounded-lg p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Candidate Details
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Election ID: {electionId}
                    </p>
                </div>

                {/* Candidate List */}
                {candidates.length > 0 ? (
                    <div className="space-y-4">
                        {candidates.map(candidate => (
                            <div
                                key={candidate.candidateId}
                                className="border border-slate-200 rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                            >
                                <div>
                                    <p className="font-medium text-slate-800">
                                        {candidate.candidateName}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        Party: {candidate.candidateParty}
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {candidate.candidateDescription}
                                    </p>
                                </div>

                                {role?.includes("ADMIN") && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/candidate/${candidate.candidateId}/election/${electionId}`
                                                )
                                            }
                                            className="px-4 py-2 font-medium border border-orange-600 text-orange-700 rounded-md text-sm hover:bg-orange-50 transition"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(candidate.candidateId)}
                                            className="px-4 py-2 bg-red-700 text-white font-medium rounded-md text-sm hover:bg-red-800 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-600">
                        No candidates found for this election.
                    </p>
                )}

                {/* Add Candidate */}
                {role?.includes("ADMIN") && (
                    <div className="mt-8 text-center">
                        <Link to={`/candidate/add/${electionId}`}>
                            <button className="px-6 py-2 bg-orange-700 text-white rounded-md font-medium hover:bg-orange-800 transition">
                                Add Candidate
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CandidateDetails;
