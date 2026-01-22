import { ArrowLeft, Bell, Wallet, Info, LogOut, MoveLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Weather from "../assets/weather.png";
const Notification = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-2 lg:bg-white p-4">
      {/* ===== Header ===== */}
      <div className="flex flex-row  items-center lg:p-6 space-x-2">
        <MoveLeft className="text-gray-600" />
        <h1 className="text-lg lg:text-2xl font-semibold">Notification</h1>
      </div>
      {/* =================Notification Card======================= */}
      <div className="grid grid-cols-1 lg:px-6">
        <div className="p-2 lg:p-4 border border-gray-100 rounded-2xl relative overflow-hidden">
          <div className="lg:p-4 z-30 overflow-hidden relative">
            <div className="flex flex-row items-center justify-between py-2">
              <h2 className="text-[16px] lg:text-2xl text-black">
                প্রিয় অভিবাবক
              </h2>
              <p className="text-[14px] lg:text-[17px] text-textc2-700">
                {new Date().toTimeString().split(" ")[0]}
              </p>
            </div>
            <p className="text-[13px] lg:text-[17px] text-textc1-700 text-justify mr-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              repellendus illum
            </p>
          </div>
          <img
            className="absolute top-0 left-0 w-[90px] lg:w-[180px] z-10"
            src={Weather}
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:px-6">
        <div className="p-2 lg:p-4 border border-gray-100 rounded-2xl relative overflow-hidden">
          <div className="lg:p-4 z-30 overflow-hidden relative">
            <div className="flex flex-row items-center justify-between py-2">
              <h2 className="text-[16px] lg:text-2xl text-black">
                প্রিয় অভিবাবক
              </h2>
              <p className="text-[14px] lg:text-[17px] text-textc2-700">
                {new Date().toTimeString().split(" ")[0]}
              </p>
            </div>
            <p className="text-[13px] lg:text-[17px] text-textc1-700 text-justify mr-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              repellendus illum
            </p>
          </div>
          <img
            className="absolute top-0 left-0 w-[90px] lg:w-[180px] z-10"
            src={Weather}
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:px-6">
        <div className="p-2 lg:p-4 border border-gray-100 rounded-2xl relative overflow-hidden">
          <div className="lg:p-4 z-30 overflow-hidden relative">
            <div className="flex flex-row items-center justify-between py-2">
              <h2 className="text-[16px] lg:text-2xl text-black">
                প্রিয় অভিবাবক
              </h2>
              <p className="text-[14px] lg:text-[17px] text-textc2-700">
                {new Date().toTimeString().split(" ")[0]}
              </p>
            </div>
            <p className="text-[13px] lg:text-[17px] text-textc1-700 text-justify mr-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              repellendus illum
            </p>
          </div>
          <img
            className="absolute top-0 left-0 w-[90px] lg:w-[180px] z-10"
            src={Weather}
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:px-6">
        <div className="p-2 lg:p-4 border border-gray-100 rounded-2xl relative overflow-hidden">
          <div className="lg:p-4 z-30 overflow-hidden relative">
            <div className="flex flex-row items-center justify-between py-2">
              <h2 className="text-[16px] lg:text-2xl text-black">
                প্রিয় অভিবাবক
              </h2>
              <p className="text-[14px] lg:text-[17px] text-textc2-700">
                {new Date().toTimeString().split(" ")[0]}
              </p>
            </div>
            <p className="text-[13px] lg:text-[17px] text-textc1-700 text-justify mr-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              repellendus illum
            </p>
          </div>
          <img
            className="absolute top-0 left-0 w-[90px] lg:w-[180px] z-10"
            src={Weather}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
