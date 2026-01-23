import { ArrowLeft, Bell, Wallet, Info, LogOut, MoveLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import ProfileIcon from "../assets/profileshadow.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useState } from "react";
const StudentProfilePage = () => {
  const { user, logout } = useAuth();
  const [notificatinToggle, setNotificatinToggle] = useState(false);
  return (
    <div className="space-y-4 lg:bg-white  p-4 pb-20 lg:rounded-2xl min-h-screen">
      {/* ===== Header ===== */}
      <div className="flex items-center lg:p-6 space-x-2 pt-4 ">
        <MoveLeft className="text-gray-600 size-5" />
        <h1 className="text-[14px] lg:text-2xl font-semibold">Profile</h1>
      </div>

      {/* ===== Main Card ===== */}
      <div className="lg:bg-white rounded-2xl lg:border border-gray-100 lg:p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 capitalize ">
          {/* ===== Student Info ===== */}
          <div className="rounded-lg lg:rounded-2xl p-2 lg:p-4 space-y-2 bg-white">
            <div className="flex flex-row items-center justify-between border border-gray-100 p-3 rounded-md lg:rounded-lg relative">
              <div className="flex items-center gap-3 ">
                <div className="w-[53px] h-[53px] rounded-full bg-gradient-to-tl from-violet-800 to-purple-400 text-white flex items-center justify-center font-semibold">
                  {user?.name.slice(0, 1)}
                </div>
                <div>
                  <p className="font-medium text-[17px]">{user?.name}</p>
                  <p className="text-xs text-gray-400 text-[12px]">
                    Student ID: {user?.studentId}
                  </p>
                  <p className="text-xs text-gray-400 text-[12px]">
                    {user?.school}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0">
                <img src={ProfileIcon} alt="" />
              </div>
            </div>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                Class
              </legend>
              <p className="label text-textc1-700 text-[14px]">
                {user.classId}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                Roll
              </legend>
              <p className="label text-textc1-700 text-[14px]">{user.roll}</p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                Date Of Birth
              </legend>
              <p className="label text-textc1-700 text-[14px]">
                {new Date(user.dob).toLocaleDateString()}
              </p>
            </fieldset>
          </div>

          {/* ===== Guardian Info ===== */}
          <div className=" rounded-lg lg:rounded-xl p-2 lg:p-4 space-y-2 bg-white">
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                Guardian Name
              </legend>

              <p className="text-textc1-700 text-[14px] leading-tight">
                {user.fathername}
              </p>
            </fieldset>

            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                Guardian Number
              </legend>
              <p className="label text-textc1-700 text-[14px]">{user.phone}</p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                Guardian Address
              </legend>
              <p className="label text-textc1-700 text-[14px]">{`Dhaka Banladesh`}</p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] px-1">
                School Name
              </legend>
              <p className="label text-textc1-700 text-[14px]">{user.school}</p>
            </fieldset>
          </div>

          {/* ===== Right Menu ===== */}
          <div className="grid grid-cols-1 bg-white rounded-lg lg:rounded-xl p-2 lg:p-4">
            <div className="col-span-1  flex-col items-center justify-between space-y-2 ">
              <div className="flex flex-col items-center justify-start space-y-2 ">
                <div className="flex flex-row w-full items-center justify-between p-4 border border-gray-100 rounded-lg text-textc2-700">
                  <div className="flex items-center gap-2">
                    <Bell size={20} />
                    <span className="text-[14px] text-textc1-700">
                      Notification
                    </span>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full relative ${
                      notificatinToggle ? "bg-purple-600 " : "bg-gray-400"
                    }`}
                  >
                    <button
                      onClick={() => setNotificatinToggle(!notificatinToggle)}
                      className={`w-4 h-4 bg-white rounded-full absolute ${
                        notificatinToggle ? "right-1" : "left-1"
                      } top-0.5`}
                    ></button>
                  </div>
                </div>
                <div className="flex lg:hidden w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700">
                  <Wallet size={20} />
                  <span className="text-[14px] text-textc1-700">Finance</span>
                </div>
                <div className="flex lg:hidden  w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700">
                  <Info size={20} />
                  <span className="text-[14px] text-textc1-700">About Us</span>
                </div>
                <div className="flex lg:hidden  w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700">
                  <Info size={20} />
                  <span className="text-[14px] text-textc1-700">
                    Terms & Conditions
                  </span>
                </div>
              </div>
              <button className="hidden lg:block w-full py-4 bg-primary-700 text-white capitalize rounded-xl text-[17px] font-lexend">
                {" "}
                contact with school teacher
              </button>
            </div>
          </div>
        </div>
        <div className="lg:hidden flex flex-row space-x-2 p-4 bg-white border border-gray-100 rounded-lg">
          <button
            className="flex text-primary-700 flex-row items-center justify-between space-x-2 text-[14px]"
            onClick={() => logout()}
          >
            <LogOut /> <h2>Log out</h2>
          </button>
        </div>
        <button className=" flex flex-row items-center space-x-2 justify-center lg:hidden  w-full py-3 bg-primary-700 text-white capitalize rounded-lg text-xl font-lexend">
          {" "}
          <IoChatbubbleEllipsesOutline />
          <h2 className="text-[14px]">contact with school teacher</h2>
        </button>
      </div>
    </div>
  );
};

export default StudentProfilePage;
