import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../NotificationBell";
import SplashIcon from "../../assets/splash.png";

const TeacherHeader = () => {
  const { user, logout } = useAuth();
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
                <p className="text-[14px] font-semibold capitalize">
                  {user?.username}
                </p>
                <p className="text-[12px] text-gray-400">
                  School ID:{user?.userId}
                </p>
              </div>
              <img src={user.image} className="w-10 h-10 rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
