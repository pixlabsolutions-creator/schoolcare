import { ArrowLeft, Eye, MessageCircle, Send, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import HomeWorkSubjectCard from "./HomeWorkSubjectCard";
import { useHomework } from "../contexts/HomeworkContext";
import { useEffect } from "react";
import Homeworkicon from "../assets/homeworkicon.png";

const TeacherHomeworkDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { fetchHomeworksById, homeworkById } = useHomework();

  useEffect(() => {
    fetchHomeworksById(id);
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl">
      <div className=" hidden lg:flex flex-row items-center justify-center w-full px-4  border-b  py-8 border-gray-100">
        <button
          className="w-full flex flex-row items-center justify-start space-x-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
          <h2 className="text-[24px] font-medium">Homework details</h2>
        </button>
      </div>

      <img
        src={homeworkById[0]?.image}
        alt="Homework"
        className="w-full h-1/3 lg:h-72 sm:h-64 object-cover absolute lg:hidden top-0 left-0 right-0  z-10 lg:p-4 "
      />
      {/* Desktop Image */}
      <div className="w-full hidden lg:flex object-cover relative">
        <img
          src={homeworkById[0]?.image}
          alt="Homework"
          className="  w-full h-1/3 lg:h-72 sm:h-64 lg:p-4 rounded-[40px] "
        />
        <button className="absolute px-4 py-2 text-white bg-primary-700 top-10  right-10 rounded-md font-lexend">
          Change
        </button>
      </div>

      <div className="z-20 flex flex-row lg:hidden items-center justify-between w-full px-4 py-3">
        <div className="w-full flex lg:hidden flex-row items-start justify-start text-white">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-sm font-medium">Homework details</h2>
        </div>
        <button className="flex lg:hidden text-2xl text-white  p-1 border border-white rounded-lg ">
          <BiSolidEditAlt size={24} />
        </button>
      </div>
      <div className="w-full z-20 mt-28 p-[10px] bg-white rounded-2xl  left-4 right-4 md:hidden ">
        <HomeWorkSubjectCard
          subject={homeworkById[0]?.subject}
          teacher={homeworkById[0]?.teacher}
          date={homeworkById[0]?.date}
          image={Homeworkicon}
          id={homeworkById[0]?._id}
        />
        <div className=" space-y-3  text-justify">
          {/* Bangla Description */}
          <p>{homeworkById[0]?.details}</p>
          {/* Stats */}
          <div className="grid grid-cols-2 border border-blue-100 p-3 rounded-xl divide-x-2">
            <div className="col-span-1 flex flex-row items-center justify-center space-x-2 border-blue-100">
              <Eye size={16} />
              <span>32</span>
            </div>

            <div className="col-span-1 flex flex-row items-center justify-center space-x-2">
              <MessageCircle size={16} />
              <span>54 Comment</span>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className=" hidden lg:flex flex-col px-4 py-4 space-y-3 mt-44 md:mt-0">
        {/* Bangla Description */}
        <p>{homeworkById[0]?.details}</p>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1 flex flex-row items-center justify-center space-x-2 border border-gray-100 py-2 rounded-xl">
            <Eye size={16} />
            <span>32</span>
          </div>

          <div className="col-span-1 flex flex-row items-center justify-center space-x-2 border border-gray-100 py-2 rounded-xl">
            <MessageCircle size={16} />
            <span>54 Comment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomeworkDetailPage;
