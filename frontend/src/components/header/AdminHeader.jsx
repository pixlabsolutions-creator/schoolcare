import { useNavigate } from "react-router-dom";
import SplashIcon from "../../assets/splash.png";
import NotificationBell from "../NotificationBell";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2 hidden lg:flex flex-row items-center justify-between">
      <div className="w-52">
        <img className="" src={SplashIcon} alt="School Care" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button
            onClick={() => navigate("/profile")}
            className="relative p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[14px] font-semibold capitalize">Abdullah</p>
                <p className="text-[12px] text-gray-400">School ID: 12345</p>
              </div>
              <img
                src="https://picsum.photos/300/300"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
