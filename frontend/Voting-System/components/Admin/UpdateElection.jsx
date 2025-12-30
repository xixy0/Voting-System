import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

function UpdateElection() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { electionId } = useParams();

  const [status, setStatus] = useState("SCHEDULED");

  const handleEdit = async () => {
    try {
      await api.put(`/elections/${electionId}/status`, null, {
        params: { status }
      });

      toast.success("Election status updated");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update election");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
      <div className="w-full max-w-xl bg-white border border-orange-200 rounded-lg p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Update Election Status
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Admin control panel
          </p>
        </div>

        {role?.includes("ADMIN") ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
          >

            {/* Status Select */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Election Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                Update Status
              </button>
            </div>

          </form>
        ) : (
          <p className="text-center text-red-600 font-medium">
            You are not authorized to update elections.
          </p>
        )}

      </div>
    </div>
  );
}

export default UpdateElection;
