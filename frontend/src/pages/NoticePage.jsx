import { MoveLeft, Eye } from "lucide-react";
import Notice from "../assets/notice2.png";
import { Link } from "react-router-dom";
import { useAnouncement } from "../contexts/AnoucementContext";

const NoticePage = () => {
  const { anouncements, loading } = useAnouncement();
  console.log(anouncements);
  return (
    <div className="">
      <div className=" ">
        {/* ===== Header ===== */}
        <div className="flex flex-row items-center justify-between bg-white px-4 py-4 rounded-t-2xl lg:border-b-[1px] lg:border-gray-200">
          <div className="flex flex-row items-start justify-start space-x-2">
            <MoveLeft className="" />
            <h1 className="text-lg font-semibold text-gray-800">Notice</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 bg-white p-4 lg:p-6">
          {anouncements.map((anouncement) => (
            <NoticeAnnouncement
              id={anouncement._id}
              title={anouncement.title}
              descriptions={anouncement.descriptions}
              like={anouncement.like}
              teacher={anouncement.teacher}
              comment={anouncement.conmment}
            />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default NoticePage;

// reuseable Component

const NoticeAnnouncement = ({
  title,
  descriptions,
  like,
  teacher,
  comment,
  id,
}) => {
  return (
    <div className="col-span-1 flex flex-col space-y-4 border border-blue-100 p-3 rounded-2xl">
      <div className="flex flex-row items-center justify-between border border-blue-100 rounded-2xl p-3">
        <div className="flex flex-row items-center justidy-start space-x-2">
          <img className="w-24" src={Notice} alt="" />
          <div>
            <h2 className="text-xl font-lexend">Notice</h2>
            <h2 className="text-lg text-gray-500 capitalize">{teacher}</h2>
            <p className="text-md text-gray-400">30/12/25</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-md text-gray-500 line-clamp-6 text-justify">
          {descriptions}
        </p>
        <Link to={id} className="text-[#9542E7]">
          Read More..
        </Link>
      </div>

      <div className="grid grid-cols-2 border border-blue-100 p-3 rounded-2xl ">
        <span className="col-span-1 text-center flex items-center justify-center">
          <Eye /> <span className="pl-1">{like}</span>
        </span>
        <span className="col-span-1 flex items-center justify-center">
          {comment.length} Comment
        </span>
      </div>
    </div>
  );
};
