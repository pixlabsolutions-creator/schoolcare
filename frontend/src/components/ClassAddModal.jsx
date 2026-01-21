import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useClass } from "../contexts/classContext";

const ClassAddModal = ({ setOpen, editingClass = null }) => {
  const { addNewClass } = useClass();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    school: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.school) {
      setFormData((prev) => ({
        ...prev,
        school: user.school,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (editingClass) {
      setFormData({
        name: editingClass.name || "",
        school: editingClass.school || user?.school || "",
      });
    }
  }, [editingClass, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Class name is required");
      return;
    }

    setError("");
    setLoading(true);

    const result = await addNewClass(formData);

    if (result) {
      setOpen(false);
      setFormData({ name: "", school: user?.school || "" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Class Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Class Name"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500"
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full py-3 rounded-lg border text-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-purple-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : editingClass ? "Update Class" : "Save Class"}
        </button>
      </div>
    </form>
  );
};

export default ClassAddModal;
