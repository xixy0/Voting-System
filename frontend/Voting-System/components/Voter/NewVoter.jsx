import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function NewVoter() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    voterIdNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddVoter = async () => {
    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmpassword;

      await api.post("/auth/register", payload);

      toast.success("Voter registered successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        voterIdNumber: "",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register voter");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 p-6">
      <div className="w-full max-w-3xl bg-white border border-orange-200 rounded-lg p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Voter Registration
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Register as a verified voter
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddVoter();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            {/* Voter ID */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Voter ID Number
              </label>
              <input
                type="text"
                name="voterIdNumber"
                required
                value={formData.voterIdNumber}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            {/* Confirm Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                required
                value={formData.confirmpassword}
                onChange={handleInputChange}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  formData.password &&
                  formData.confirmpassword &&
                  formData.password !== formData.confirmpassword
                    ? "border border-red-500 focus:ring-red-400"
                    : "border border-slate-300 focus:ring-orange-600"
                }`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 border border-orange-300 text-orange-700 rounded-md hover:bg-orange-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-orange-700 text-white rounded-md font-medium hover:bg-orange-800 transition"
            >
              Register Voter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewVoter;
