import { useState } from "react";

export default function NewsForm() {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    descriptions: "",
    school: "",
  });

  const [loading, setLoading] = useState(false);

  // Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("title", formData.title);
      data.append("descriptions", formData.descriptions);
      data.append("school", formData.school);

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/news`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        alert("News Added Successfully");
        setFormData({
          image: null,
          title: "",
          descriptions: "",
          school: "",
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add News</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="descriptions"
          placeholder="Description"
          value={formData.descriptions}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        {/* School */}
        <input
          type="text"
          name="school"
          placeholder="School Name"
          value={formData.school}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Submit News"}
        </button>
      </form>
    </div>
  );
}
