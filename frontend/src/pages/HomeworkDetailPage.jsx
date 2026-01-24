import { ArrowLeft, Eye, Heart, MessageCircle, MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useHomework } from "../contexts/HomeworkContext";
import { useEffect } from "react";
import Homeworkicon from "../assets/homeworkicon.png";
import { useAuth } from "../contexts/AuthContext";

const HomeworkDetailPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { fetchHomeworksById, homeworkById, updateLike } = useHomework();

  useEffect(() => {
    fetchHomeworksById(id);
  }, [id]);
  const isLiked = homeworkById[0]?.like?.likerId?.includes(user?.userId);

  const date = new Date(homeworkById[0]?.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-full">
      {/* ============Mobile=================== */}
      <div className="lg:hidden h-full relative">
        <div className="h-1/3">
          <img className="w-full h-60" src={homeworkById[0]?.image} alt="" />
          <div className="absolute top-5 left-4 flex flex-row items-center justify-start space-x-2 text-white text-[17px] font-lexend">
            <button onClick={() => navigate(-1)}>
              <MoveLeft />
            </button>
            <h2>Homework details</h2>
          </div>
        </div>
        <div className="flex flex-col p-[15px] absolute top-48 left-0 right-0 ">
          <div className="bg-white p-2 rounded-xl">
            <div className="flex flex-row p-2 border border-gray-100 rounded-lg mb-2 space-x-4">
              <img className="w-[68px]" src={Homeworkicon} alt="icon" />
              <div>
                <h2 className="text-[17px] font-kalpurush">
                  {homeworkById[0]?.subject}
                </h2>
                <h2 className="text-[14px] text-textc1-700 font-kalpurush">
                  {homeworkById[0]?.teacher}
                </h2>
                <h2 className="text-[14px] font-kalpurush">{formattedDate}</h2>
                <h2>{}</h2>
                <h2></h2>
              </div>
            </div>
            <h2 className="text-[14px] font-kalpurush py-2 text-justify">
              {homeworkById[0]?.details}
            </h2>
            <div className="grid grid-cols-2 p-2 border border-gray-100 rounded-lg divide-x-2">
              <div className="flex flex-row items-center justify-center space-x-2">
                <Eye size={17} />
                <span>32</span>
              </div>
              <button
                className={`col-span-1 flex flex-row items-center justify-center space-x-2 ${
                  isLiked ? "text-red-500" : "text-textc1-700"
                }`}
                onClick={() => updateLike(homeworkById[0]?._id, user?.userId)}
              >
                {isLiked ? <Heart fill="red" size={16} /> : <Heart size={16} />}
                <span>{homeworkById[0]?.like?.likerId?.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ==================Desktop=================== */}
      <div className="bg-white hidden lg:flex flex-col rounded-xl min-h-screen">
        <div className="flex flex-row items-center space-x-4 py-8 px-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)}>
            <MoveLeft />
          </button>

          <h2>Homework Details</h2>
        </div>
        <div className="p-4">
          <div className="p-4 border border-gray-100 rounded-xl">
            <img
              className="w-full h-60 rounded-xl"
              src={homeworkById[0]?.image}
              alt=""
            />
            <div className="py-4 font-kalpurush text-[24px] text-justify">
              <h2>{homeworkById[0]?.details}</h2>
            </div>
            <div className="grid grid-cols-2 border border-gray-100 p-4 rounded-xl divide-x-2">
              <div className="flex flex-row items-center justify-center space-x-2">
                <Eye />
                <span>32</span>
              </div>
              <button
                className={`col-span-1 flex flex-row items-center justify-center space-x-2 ${
                  isLiked ? "text-red-500" : "text-textc1-700"
                }`}
                onClick={() => updateLike(homeworkById[0]?._id, user?.userId)}
              >
                {isLiked ? <Heart fill="red" size={16} /> : <Heart size={16} />}
                <span>{homeworkById[0]?.like?.likerId?.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkDetailPage;
