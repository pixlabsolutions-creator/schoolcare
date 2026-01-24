import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveLeft, Camera } from "lucide-react";
import { useSchool } from "../contexts/SchoolContext";

const AddSchool = () => {
  const { addSchool } = useSchool();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: "",
    address: "",
    joinedOn: "",
    headMasterName: "",
    phone: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== Input Change ===== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===== Image Change ===== */
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ===== Submit ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const paylode = {
      ...formData,
      school: formData.school.trim().toLowerCase(),
    };

    const success = await addSchool(paylode, image);

    if (success) {
      setFormData({
        school: "",
        address: "",
        joinedOn: "",
        headMasterName: "",
        phone: "",
      });
      setImage(null);
      setPreview(null);
      navigate(-1);
    }

    setLoading(false);
  };

  return (
    <div className="w-full lg:bg-white rounded-2xl lg:pb-20 lg:min-h-screen">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between lg:bg-white lg:py-8 lg:px-4 rounded-t-2xl lg:border-b">
        <div className="flex flex-row items-center gap-2">
          <MoveLeft
            size={22}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[14px] lg:text-lg font-semibold text-gray-800">
            Add School
          </h1>
        </div>
      </div>

      {/* ===== Form Body ===== */}
      <form
        onSubmit={handleSubmit}
        className="lg:bg-white py-4 lg:p-6 rounded-b-2xl w-2/3 mx-auto"
      >
        {/* ===== Avatar ===== */}
        <div className="flex justify-center mb-6">
          <label className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-primary-700 flex items-center justify-center bg-white lg:bg-gray-100 cursor-pointer overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className=" text-primary-700" />
            )}
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </label>
        </div>

        {/* ===== Form Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 rounded-[17px]">
          <Input
            label="School name"
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            label="Joined on"
            name="joinedOn"
            type="date"
            value={formData.joinedOn}
            onChange={handleChange}
          />
          <Input
            label="Head Master Name"
            name="headMasterName"
            value={formData.headMasterName}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* ===== Submit Button ===== */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-xl font-medium transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add School"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchool;

/* ===== Reusable Input ===== */
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <fieldset className="border bg-white border-gray-300 rounded-xl px-3 focus-within:border-purple-500">
      <legend className="px-2 text-sm text-gray-600">{label}</legend>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none px-1 py-2 text-sm focus:ring-0"
      />
    </fieldset>
  );
};
