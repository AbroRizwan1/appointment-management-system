import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Login({ loginData }) {
  const navigate = useNavigate();

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  }

  function Loginform(e) {
    e.preventDefault();
    loginData(form);
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div
            className="flex items-start gap-2 mb-16 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ChevronLeft
              size={20}
              className="text-gray-600 mb-4 bg-blue-600 text-white rounded-full p-0.5"
            />
            <p className="text-gray-600 text-sm ">Back to Home</p>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please login to your account
          </p>
          <form
            onSubmit={(e) => {
              Loginform(e);
            }}
          >
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                value={form.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="password"
                value={form.password}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="sumbit"
              onClick={() => {}}
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
