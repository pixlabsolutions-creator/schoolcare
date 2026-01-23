import { ArrowLeft, Eye, MessageCircle, MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import { useNews } from "../contexts/NewsContext";

const StudentNewsDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { fetchNewsById, newsById } = useNews();

  useEffect(() => {
    if (!id) return;
    fetchNewsById(id);
  }, [id]);
  return (
    <div className=" lg:bg-white lg:rounded-2xl">
      <div className=" flex flex-row items-center space-x-2 p-4 lg:px-6 lg:py-8 lg:border-b border-gray-200">
        <button onClick={() => navigate(-1)}>
          <MoveLeft size={17} />
        </button>
        <h2 className=" font-medium text-[17px]">News Details</h2>
      </div>
      <div className="px-[15px] lg:py-4">
        <div className="p-[10px] rounded-[20px] bg-white">
          <img
            src={newsById[0]?.image}
            alt="Homework"
            className="w-full h-52 lg:h-72 sm:h-64 object-cover  rounded-[15px]"
          />
          <div className=" space-y-2 mt-4">
            <h2 className="text-textc1-700 text-[14px]">
              {newsById[0]?.title}
            </h2>
            <p className="text-textc2-700 text-[14px] text-justify">
              {newsById[0]?.descriptions}
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 border border-gray-100 p-3 rounded-xl divide-x-2">
              <div className="col-span-1 flex flex-row items-center justify-center space-x-2">
                <Eye size={14} />
                <span className="text-[14px]">32</span>
              </div>

              <div className="col-span-1 flex flex-row items-center justify-center space-x-2">
                <MessageCircle size={14} />
                <span className="text-[14px]">54 Comment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNewsDetail;
