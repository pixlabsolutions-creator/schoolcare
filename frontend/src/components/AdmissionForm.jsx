import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoveLeft, Camera } from "lucide-react";
import { useClass } from "../contexts/classContext";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useStudent } from "../contexts/studentContext";

const AdmissionForm = () => {
  const { classes } = useClass();
  const { user } = useAuth();
  const { setStudents } = useStudent();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    classId: "",
    dob: "",
    address: "",
    phone: "",
    fathername: "",
    password: "",
    loginNumber: "",
    school: "",
    teacher: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        school: user.school,
        teacher: user.username,
      }));
    }
  }, [user]);

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

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("image", image);
      console.log(data);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/student`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const resdata = await res.data;
      toast.success("Student admitted successfully");
      setStudents((prev) => [...prev, resdata.student]);
      setFormData({
        name: "",
        roll: "",
        classId: "",
        dob: "",
        address: "",
        phone: "",
        fathername: "",
        password: "",
        loginNumber: "",
      });
      setImage(null);
      setPreview(null);
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:bg-white">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between lg:bg-white lg:py-8 lg:px-4  rounded-t-2xl lg:border-b">
        <div className="flex flex-row items-center gap-2">
          <MoveLeft size={22} className="cursor-pointer" />
          <h1 className="text-[14px] lg:text-lg font-semibold text-gray-800">
            Admit Student
          </h1>
        </div>
      </div>

      {/* ===== Form Body ===== */}
      <form
        onSubmit={handleSubmit}
        className="lg:bg-white py-4 lg:p-6 rounded-b-2xl "
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
              <Camera className="text-gray-500 text-primary-700" />
            )}
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </label>
        </div>

        {/* ===== Form Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 rounded-[17px]">
          <Input
            label="Student name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Class */}
          <fieldset className="border bg-white border-gray-300 rounded-xl px-3 pb-2 focus-within:border-purple-500">
            <legend className="px-2 text-sm text-gray-600">Class</legend>

            <select
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              className="w-full bg-transparent outline-none px-1 py-2 text-sm focus:ring-0"
            >
              <option value="">Select class</option>
              {classes?.map((cls) => (
                <option key={cls._id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </fieldset>

          <Input
            label="Date of birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            label="Father name"
            name="fathername"
            value={formData.fathername}
            onChange={handleChange}
          />

          <Input
            label="Password for Login"
            type="password"
            name="password"
            value={formData.password}
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
            {loading ? "Submitting..." : "Admit Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

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
    <fieldset className="border bg-white border-gray-300 rounded-xl px-3  focus-within:border-purple-500">
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

export default AdmissionForm;
