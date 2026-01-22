import { ArrowLeft, Eye, Heart, MessageCircle, MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useHomework } from "../contexts/HomeworkContext";
import { useEffect } from "react";
import Homeworkicon from "../assets/homeworkicon.png";

const TeacherHomeworkDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { fetchHomeworksById, homeworkById } = useHomework();
  console.log(homeworkById);
  useEffect(() => {
    fetchHomeworksById(id);
  }, [id]);
  return (
    <div className="min-h-screen lg:bg-gray-50 flex justify-center   lg:p-4">
      <div className="w-full flex flex-col lg:space-y-4  bg-white  overflow-hidden">
        {/* Header */}
        <div className="hidden lg:flex items-center lg:gap-3  border-b p-8">
          <button onClick={() => navigate(-1)}>
            <MoveLeft size={22} />
          </button>
          <h2 className=" font-medium text-2xl">Homework details</h2>
        </div>

        <div className="lg:p-4">
          {/* Image Section */}
          <div className="relative ">
            <div className="flex absolute top-6 text-white lg:hidden items-center px-4  lg:py-3 space-x-2">
              <button onClick={() => navigate(-1)}>
                <MoveLeft size={22} />
              </button>
              <h2 className="text-[17px] lg:text-xl font-medium">
                Homework details
              </h2>
            </div>
            <img
              src={homeworkById[0]?.image}
              alt="Homework"
              className="w-full h-52 lg:h-72 sm:h-64 object-cover  lg:rounded-2xl"
            />

            <div className=" hidden absolute p-2 m-2 bg-white rounded-2xl bottom-[-84px] left-2 right-2 md:hidden">
              <HomeWorkSubjectCard
                subject={homeworkById[0]?.subject}
                teacher={homeworkById[0]?.teacher}
                date={homeworkById[0]?.date}
                image={Homeworkicon}
                id={homeworkById[0]?._id}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <div className=" absolute p-2 m-2 bg-white rounded-2xl top-[-112px] left-2 right-2 md:hidden">
              <HomeWorkSubjectCard
                subject={homeworkById[0]?.subject}
                teacher={homeworkById[0]?.teacher}
                date={homeworkById[0]?.date}
                image={Homeworkicon}
                id={homeworkById[0]?._id}
              />
            </div>
            <div className="px-6 py-4 space-y-3 mt-20 md:mt-0">
              <h2 className="text-textc1-700 text-[14px]">
                {homeworkById[0]?.subject}
              </h2>
              <p className="text-textc2-700 text-[14px] text-justify">
                {homeworkById[0]?.details}
              </p>
              {/* Stats */}
              <div className="grid grid-cols-2 border border-blue-100 p-4 rounded-xl">
                <div className="col-span-1 flex flex-row items-center justify-center space-x-2 border-blue-100">
                  <Eye size={14} />
                  <span className="text-[14px]">32</span>
                </div>

                <div className="col-span-1 flex flex-row items-center justify-center space-x-2">
                  <Heart size={14} />
                  <span className="text-[14px]">54</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomeworkDetailPage;

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
      <div className="p-2 ">
        <img className="hidden lg:block w-full rounded-xl" src={image} alt="" />
        <img
          className="lg:hidden w-[51px] h-[51px] "
          src={Homeworkicon}
          alt=""
        />
      </div>
      <div className="flex flex-col lg:space-y-1">
        <h2 className="text-[14px] lg:text-2xl">{subject}</h2>
        <span className="text-[12px] lg:text-sm text-gray-700">{teacher}</span>
        <p className="text-[12px] text-gray-500">{formatDateToDDMMMYY(date)}</p>
      </div>
    </div>
  );
};
