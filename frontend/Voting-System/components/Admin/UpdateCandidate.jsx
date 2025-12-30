import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

function UpdateCandidate() {

    const { candidateId, electionId } = useParams();
    const { role } = useAuth();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState({
        candidateId: candidateId,
        candidateName: "",
        candidateParty: "",
        candidateDescription: "",
        electionId: electionId
    })
    

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCandidates(prev => ({ ...prev, [name]: value }));
    }

    const handleEdit = async () => {
        try {
            const payload = { ...candidates };
            await api.post(`/candidates/${candidateId}`, payload);
            toast.success("Candidate Updated");
            navigate(-1)
        } catch (err) {
            toast.error("Error adding candidate")
            console.error(err);
        }
    }



    return (
        <React.Fragment>
            <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
                <div className="w-full max-w-3xl bg-white border border-orange-200 rounded-lg p-8">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold text-slate-800">
                            Update Candidate
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Admin panel – election setup
                        </p>
                    </div>

                    {/* Form */}
                    {role?.includes("ADMIN") ? (<form
                        className="space-y-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEdit();
                        }}
                    >

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">
                                Candidate Name
                            </label>
                            <input
                                name="candidateName"
                                value={candidates.candidateName}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">
                                Candidate Party
                            </label>
                            <input
                                name="candidateParty"
                                value={candidates.candidateParty}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">
                                Candidate Description
                            </label>
                            <textarea
                                name="candidateDescription"
                                value={candidates.candidateDescription}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-5 py-2 border border-slate-300 text-slate-600 rounded-md hover:bg-slate-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-5 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-800 transition"
                            >
                                Update
                            </button>


                        </div>

                    </form>) : (
                        (
                            <p className="text-center text-red-600 font-medium">
                                You are not authorized to visit this page.
                            </p>
                        )
                    )}
                </div>
            </div>

        </React.Fragment>
    )
}

export default UpdateCandidate