import { useEffect, useState } from "react";

import { MoveLeft, EyeOff, Trash2, Eye, Heart } from "lucide-react";
import Notice from "../assets/notice2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAnouncement } from "../contexts/AnoucementContext";
import { useAuth } from "../contexts/AuthContext";

const NoticeDetailPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchAnouncementById, anouncementsById, updateLike } =
    useAnouncement();

  useEffect(() => {
    if (!id) return;
    fetchAnouncementById(id);
  }, [id]);

  const isLiked = anouncementsById?.like?.likerId?.includes(user?._id);

  console.log(anouncementsById);
  return (
    <div className="lg:bg-white rounded-3xl lg:min-h-screen p-[15px]">
      {/* ===== Header ===== */}
      <div className="flex flex-row items-center justify-between  lg:border-b-[1px] lg:border-gray-200 p-[15px]  lg:p-8">
        <div className="flex flex-row items-start justify-start space-x-2">
          <MoveLeft onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold text-gray-800">Notice</h1>
        </div>
      </div>
      <div className="grid grid-cols-1  gap-2 lg:gap-4   lg:p-6">
        <div className="col-span-1 flex flex-col space-y-4 border border-gray-100 p-2 lg:p-4 bg-white rounded-2xl">
          <div className="flex flex-row items-center justify-between border border-gray-100 rounded-2xl p-5">
            <div className="flex flex-row items-center justidy-start space-x-4">
              <img className="w-24" src={Notice} alt="Notice" />
              <div>
                <h2 className="text-xl font-lexend">Notice</h2>
                <h2 className="text-lg text-gray-500 capitalize">
                  {anouncementsById?.teacher && anouncementsById?.teacher}
                </h2>
                <p className="text-md text-gray-400">
                  {anouncementsById?.createdAt &&
                    new Date(anouncementsById?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-[14px] lg:text-[17px] font-semibold font-kalpurush">
              {anouncementsById?.title && anouncementsById?.title}
            </h2>
            <p className="text-[14px] lg:text-[17px] text-gray-500 text-justify font-kalpurush">
              {anouncementsById?.descriptions && anouncementsById?.descriptions}
            </p>
          </div>

          <div className="grid grid-cols-2 border border-gray-100 p-3 rounded-2xl font-kalpurush ">
            <span className="col-span-1 text-center flex items-center justify-center space-x-1">
              <Eye size={20} /> <span className=" text-[20px]">0</span>
            </span>
            <div className="flex flex-row items-center justify-center space-x-1">
              <button
                onClick={() => updateLike(anouncementsById._id, user?._id)}
                className={`flex flex-row items-center space-x-2`}
              >
                {isLiked ? <Heart fill="red" size={20} /> : <Heart size={20} />}
                <span>{anouncementsById?.like?.likerId?.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NoticeDetailPage;
