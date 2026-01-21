import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSchool } from "../contexts/SchoolContext";

const roles = ["admin", "teacher", "student", "accountant"];

const TeacherAddModal = ({ setUsers, setOpenModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    school: "",
    userRole: "teacher",
    password: "",
    phone: "",
    address: "",
  });
  const { schools } = useSchool();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const schoolList = schools?.map((school) => school.school);
  console.log(schoolList);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, school, password, phone } = formData;

    if (!username || !school || !password || !phone) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      // ✅ append new user to list
      if (setUsers) {
        setUsers((prev) => [...prev, result.data]);
      }

      setMessage("User created successfully ✅");

      setFormData({
        username: "",
        school: "",
        password: "",
        phone: "",
        address: "",
      });

      setOpenModal && setOpenModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-center mb-4">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* School */}
        <select
          name="school"
          value={formData.school}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select School</option>
          {schoolList.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 pr-10"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-lg px-3 py-2"
        />
        {/* Address */}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border rounded-lg px-3 py-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default TeacherAddModal;
