import { useState } from "react";
import { useNews } from "../contexts/NewsContext";
import { Trash2 } from "lucide-react";
import ClassDeleteModal from "./ClassDeleteModal";

export default function News() {
  const { allNews, setAllNews, deleteNews, openModal, setOpenModal } =
    useNews();
  const [deleteId, setDeleteId] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    descriptions: "",
  });

  const [loading, setLoading] = useState(false);

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

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/news`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        alert("News Added Successfully");

        setAllNews([...allNews, result.data]);

        setFormData({
          image: null,
          title: "",
          descriptions: "",
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 mx-auto bg-white p-6 rounded shadow relative">
      <div className="col-span-1 lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Add News</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="descriptions"
            placeholder="Description"
            value={formData.descriptions}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
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

      {/* News List */}
      <div className=" col-span-1 lg:col-span-2 grid grid-cols-2 gap-2">
        {allNews.map((news) => (
          <div
            key={news._id}
            className="flex flex-row space-x-2 border p-4  rounded col-span-1 relative"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-[120px] h-[120px] object-cover rounded "
            />
            <div>
              <h3 className="text-xl font-bold line-clamp-1">{news.title}</h3>
              <p className="line-clamp-2">{news.descriptions}</p>
              <p className="text-sm text-gray-500">{news.school}</p>
            </div>
            <button
              className="absolute right-2 top-2 text-rose-600"
              onClick={() => {
                setOpenModal(true);
                setDeleteId(news._id);
              }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenModal(false)}
          />

          {/* Modal box */}
          <div className="relative bg-white w-[90%] max-w-[380px] rounded-xl p-2 lg:p-6 z-10">
            <ClassDeleteModal
              setDeleteModal={setOpenModal}
              handleDelete={deleteNews}
              id={deleteId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
