import { useState, useRef, useEffect } from "react";
import { MoveLeft } from "lucide-react";
import { MdOutlineFileUpload } from "react-icons/md";
import Icon from "../assets/upload.png";
import { useAuth } from "../contexts/AuthContext";
import { useHomework } from "../contexts/HomeworkContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddHomeWork = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const { user } = useAuth();

  const { AddHomeWork: addHomeworkContext } = useHomework();

  const navigate = useNavigate();

  const { name } = useParams();

  /* ===== Handlers ===== */
  const handleFileChange = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !subject || !details || !user?.username || !user?.school) {
      return toast.error("All fields are required");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("subject", subject);
    formData.append("details", details);
    formData.append("teacher", user?.username);
    formData.append("className", name);
    formData.append("school", user?.school);

    setLoading(true);
    try {
      const data = await addHomeworkContext(formData); // use context
      if (data) {
        toast.success("Homework added successfully 🎉");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 flex flex-col space-y-4 min-h-screen p-4 lg:p-8">
      <Header title="Add Homework" />
      <HomeworkForm
        subject={subject}
        setSubject={setSubject}
        details={details}
        setDetails={setDetails}
        image={image}
        preview={preview}
        fileInputRef={fileInputRef}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleFileChange={(e) => handleFileChange(e.target.files[0])}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default AddHomeWork;

/* ===== Helper Components ===== */
const Header = ({ title }) => (
  <div className="flex items-center justify-start bg-white px-4 py-4 rounded-t-2xl lg:border-b lg:border-gray-200">
    <MoveLeft className="lg:hidden" />
    <h1 className="text-lg font-semibold text-gray-800 ml-2">{title}</h1>
  </div>
);

const HomeworkForm = ({
  subject,
  setSubject,
  details,
  setDetails,
  image,
  preview,
  fileInputRef,
  handleDrop,
  handleDragOver,
  handleFileChange,
  handleSubmit,
  loading,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center justify-center w-full space-y-6 "
  >
    {/* Drag & Drop */}
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full lg:w-1/2 rounded-2xl border-2 border-dashed border-violet-400 flex flex-col items-center justify-center p-6 space-y-4 cursor-pointer hover:bg-violet-50 transition"
      onClick={() => fileInputRef.current.click()}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl"
        />
      ) : (
        <>
          <img className="w-20" src={Icon} alt="Upload" />
          <h2 className="text-gray-500 text-sm">Drag & drop your file here</h2>
          <button
            type="button"
            className="flex items-center space-x-2 text-md bg-violet-600 text-white px-6 py-2 rounded-full"
          >
            <MdOutlineFileUpload />
            <span className="uppercase text-xs font-lexend">
              Click to upload
            </span>
          </button>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
    </div>

    {/* Subject & Details */}
    <InputField
      label="Subject"
      value={subject}
      setValue={setSubject}
      placeholder="Please write the subject here..."
    />
    <TextAreaField
      label="About Homework"
      value={details}
      setValue={setDetails}
      placeholder="Write something..."
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full lg:w-1/2 px-20 py-3 text-white font-semibold bg-violet-600 rounded-lg hover:opacity-90 disabled:opacity-60 "
    >
      {loading ? "Publishing..." : "Publish"}
    </button>
  </form>
);

const InputField = ({ label, value, setValue, placeholder }) => (
  <fieldset className="w-full lg:w-1/2 p-2  border rounded-2xl">
    <legend className="font-semibold text-gray-700">{label}</legend>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full p-4 rounded-xl  focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
  </fieldset>
);

const TextAreaField = ({ label, value, setValue, placeholder }) => (
  <fieldset className="w-full lg:w-1/2 p-4 border rounded-2xl">
    <legend className="font-semibold text-gray-700">{label}</legend>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={5}
      placeholder={placeholder}
      className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
    />
  </fieldset>
);
