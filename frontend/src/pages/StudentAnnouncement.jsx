import { ArrowLeft, Eye, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useHomework } from "../contexts/HomeworkContext";
import { useEffect } from "react";
import Homeworkicon from "../assets/homeworkicon.png";
import { useAnouncement } from "../contexts/AnoucementContext";

const StudentAnnouncenmect = () => {
  const navigate = useNavigate();
  const { fetchAnouncementById, anouncementById } = useAnouncement();
  const { id } = useParams();

  useEffect(() => {
    fetchAnouncementById(id);
  }, [id]);
  console.log("anouncementById", anouncementById);
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <div className="w-full flex flex-col lg:space-y-4  bg-white  overflow-hidden">
        {/* Header */}
        <div className="hidden lg:flex items-center lg:gap-3  border-b p-8">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </button>
          <h2 className=" font-medium text-2xl">Announcement</h2>
        </div>

        <div className="lg:p-4">
          {/* Image Section */}
          <div className="relative">
            <div className="flex absolute top-6 text-white lg:hidden items-center  px-4 lg:py-3 ">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft size={22} />
              </button>
              <h2 className="text-lg lg:text-xl font-medium">Announcement</h2>
            </div>
            <img
              src={anouncementById?.image}
              alt="Homework"
              className="w-full h-52 lg:h-72 sm:h-64 object-cover  lg:rounded-2xl"
            />

            <div className="absolute p-2 bg-white rounded-2xl bottom-[-60px] left-2 right-2 md:hidden">
              <HomeWorkSubjectCard
                subject={anouncementById?.title}
                teacher={anouncementById?.teacher}
                date={anouncementById?.date}
                image={Homeworkicon}
                id={anouncementById?._id}
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4 space-y-3 mt-12 md:mt-0">
            <h2 className="text-textc1-700 text-[14px]">
              {anouncementById?.title}
            </h2>
            <p className="text-textc2-700 text-[14px] text-justify">
              {anouncementById?.descriptions}
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 border border-blue-100 p-4 rounded-xl">
              <div className="col-span-1 flex flex-row items-center justify-center space-x-2 border-blue-100">
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

export default StudentAnnouncenmect;

export const HomeWorkSubjectCard = ({ image, subject, teacher, date, _id }) => {
  function formatDateToDDMMMYY(date) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date,
    );
    return formattedDate.replace(/\//g, "-");
  }

  return (
    <div
      to={`${_id}`}
      className="flex flex-row  items-center lg:items-start p-2 lg:flex-col lg:space-y-2  lg:p-4 border border-gray-100 rounded-xl space-x-2 relative"
    >
      <div className="p-2 border border-gray-100 rounded-lg">
        <img className="hidden lg:block w-full rounded-xl" src={image} alt="" />
        <img
          className="lg:hidden w-[51px] h-[51px] "
          src={Homeworkicon}
          alt=""
        />
      </div>
      <div className="flex flex-col lg:space-y-1">
        <h2 className="text-[14px] lg:text-2xl font-kalpurush">{subject}</h2>
        <span className="text-[12px] lg:text-sm text-gray-700 font-kalpurush">
          {teacher}
        </span>
        <p className="text-[12px] text-gray-500">{formatDateToDDMMMYY(date)}</p>
      </div>
    </div>
  );
};
