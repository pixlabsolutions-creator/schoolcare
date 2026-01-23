import { useState } from "react";
import axios from "axios";

export default function ProfileImageModal({
  isOpen,
  onClose,
  userId,
  currentImage,
  onUpdated,
}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(currentImage || null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);
    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/${userId}/image`,
        formData,
      );

      onUpdated(res.data.image);
      onClose();
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl  max-w-md p-2 lg:p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload Profile Photo
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full border overflow-hidden bg-gray-100">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Photo
              </div>
            )}
          </div>
        </div>

        {/* Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-4"
        />

        <div className="flex gap-3">
          <button onClick={onClose} className="w-1/2 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-1/2 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
