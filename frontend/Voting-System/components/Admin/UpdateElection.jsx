import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function UpdateElection() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const { electionId } = useParams();

    const [status, setStatus] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = async () => {
        try {
            await api.post(`/${electionId}/status`, status);
            toast.success("Election updated");
            navigate(-1);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update election");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
            <div className="w-full max-w-3xl bg-white border border-orange-200 rounded-lg p-8">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Create Election
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Admin panel – election setup
                    </p>
                </div>

                {/* Form */}
                {role?.includes("ADMIN") && <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-1">
                            Election Title
                        </label>
                        <input
                            name="electionTitle"
                            value={formData.electionTitle}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-1">
                            Election Description
                        </label>
                        <textarea
                            name="electionDescription"
                            value={formData.electionDescription}
                            onChange={handleInputChange}
                            rows={4}
                            required
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                        />
                    </div>

                    {/* Date Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">
                                Start Time
                            </label>
                            <input
                                type="datetime-local"
                                name="electionStartTime"
                                value={formData.electionStartTime}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">
                                End Time
                            </label>
                            <input
                                type="datetime-local"
                                name="electionEndTime"
                                value={formData.electionEndTime}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                            />
                        </div>

                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-1">
                            Election Status
                        </label>
                        <select
                            name="electionStatus"
                            value={formData.electionStatus}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
                        >
                            <option value="SCHEDULED">Scheduled</option>
                            <option value="ACTIVE">Active</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
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
                            Create Election
                        </button>
                    </div>

                </form>}
            </div>
        </div>
    );
}

export default UpdateElection