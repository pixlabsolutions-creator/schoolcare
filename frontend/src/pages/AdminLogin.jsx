import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashIcon from "../assets/splash.png";
import { useAdmin } from "../contexts/AdminContext";

const AdminLogin = () => {
  const { admin, login } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });

  useEffect(() => {
    if (admin) {
      navigate("/admin", { replace: true });
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = await login(formData);
    if (!a) return;
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-t bg-white flex items-center justify-center p-3 sm:p-6 relative">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden">
        <svg
          className="hidden md:block absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          fill="none"
        >
          <path d="M500 0 V600" stroke="#8B5CF6" strokeDasharray="6 6" />
          <path
            d="M1000 0 C700 200 700 400 1000 600"
            stroke="#8B5CF6"
            strokeDasharray="6 6"
          />
          <path
            d="M0 600 C300 400 300 200 0 0"
            stroke="#8B5CF6"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Login Card */}
        <div className="relative z-10 flex items-center justify-center min-h-[520px] px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl  sm:p-8">
            {/* Logo */}
            <div className="flex flex-col space-y-3 mb-6">
              <div className="flex justify-start w-3/5">
                <img src={SplashIcon} alt="" />
              </div>
              <h1 className="text-[14px]  text-textc3-700">
                Do not share your password with anyone
              </h1>
            </div>

            {/* Role Switch */}
            <div className="flex items-center justify-center font-sans rounded-lg overflow-hidden mb-4 bg-gradient-to-t from-purple-900 to-purple-500 text-white uppercase">
              <h2 className="text-2xl font-lexend py-2">Admin Panel</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="adminId"
                value={formData.adminId}
                onChange={handleChange}
                placeholder="Admin ID"
                className="w-full px-4 text-textc3-700 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90"
              >
                Login
              </button>
            </form>

            {/* Footer */}
          </div>
        </div>
      </div>
      <p className="lg:hidden mt-4 text-center text-xs text-textc1-700 bottom-10 underline absolute">
        Trams & Conditions
      </p>
    </div>
  );
};

export default AdminLogin;
