import { Calendar, Eye, ChevronRight, Heart, ArrowRight } from "lucide-react";
import { TiPin } from "react-icons/ti";
import StudentImage from "../../assets/students.png";
import { useHomework } from "../../contexts/HomeworkContext";
import { useAnouncement } from "../../contexts/AnoucementContext";

import Notice2 from "../../assets/notice2.png";
import NotificationBell from "../../components/NotificationBell";
import { Link } from "react-router-dom";
import { useNews } from "../../contexts/NewsContext";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const StudentDashboard = () => {
  const { fetchHomeworksByClassForStudent, studentHomeworkByClass } =
    useHomework();
  const { anouncements } = useAnouncement();
  const { fetchNewsBySchool, newsBySchool } = useNews();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.school) return;
    fetchNewsBySchool(user?.school);
  }, [user?.school]);

  useEffect(() => {
    if (!user?.school || !user?.clssId) return;
    fetchHomeworksByClassForStudent(user?.clssId, user?.school);
  }, [user]);

  const calendarDays = [
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    [28, 29, 30, 31, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
    [1, 2, 3, 4, 5, 6, 7],
  ];

  return (
    <div className="space-y-2 lg:space-y-6 bg-bgc-700  lg:p-4 rounded-xl p-4 pb-20">
      <div className="flex flex-row item-center justify-between lg:flex-col lg:space-y-2 mt-4 lg:mt-0">
        <div className="flex flex-col space-y-1 lg:space-y-2">
          <h1 className="text-xl lg:text-3xl  text-textc1-700 font-lexend ">
            Good Morning!
          </h1>
          <p className="text-sm lg:text-md font-sans text-textc3-700">
            Let's get ready to go to your school
          </p>
        </div>
        <div className=" lg:hidden">
          <NotificationBell />
        </div>
      </div>
      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
        {/* Average Performance */}
        <div className="h-full bg-white rounded-[12px] lg:rounded-3xl lg:border  border-gray-100 overflow-hidden lg:relative">
          <img
            className="hidden lg:flex w-full h-1/2"
            src={StudentImage}
            alt=""
          />

          {/*=================== Average Performance Progress =======================*/}
          <div className="flex flex-col  lg:space-y-4 p-2 lg:p-4 bg-white lg:absolute left-0 right-0 lg:-mt-10 rounded-2xl">
            {/* Today | Present */}
            <div className="hidden lg:flex items-center justify-between border rounded-2xl px-4 py-3  lg:mt-0 ">
              <span className="text-gray-700 font-medium">Today</span>

              <span className="w-px h-5 bg-gray-300"></span>

              <span className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Present
              </span>
            </div>
            <div className="p-2 lg:p-4 lg:border rounded-[12px] lg:rounded-2xl space-y-2 lg:space-y-4 order-1 lg:order-2">
              <div className="flex items-center flex-row justify-between text-sm lg:text-base">
                <span className="font-medium text-gray-800">
                  Average performance
                </span>

                <span className="flex items-center gap-2 text-red-500 font-medium text-sm lg:text-base">
                  <span className="flex items-center justify-end text-purple-500 tracking-widest">
                    ···········
                    <ArrowRight className="inline w-3 h-3" />
                  </span>
                  <span className="text-sm lg:text-base">Bad</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "34%",
                    background:
                      "linear-gradient(90deg, #22c55e, #facc15, #fb7185)",
                  }}
                />
              </div>

              {/* Percent */}
              <div className="flex justify-between text-xs">
                <span className="text-red-500 font-medium">34%</span>
                <span className="text-purple-500 font-medium">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Status */}
        <div className="hidden lg:block bg-white rounded-3xl lg:p-4 border border-gray-100 space-y-4">
          {/* Title */}
          <h3 className=" font-semibold text-gray-800 text-[17px] font-lexend">
            This Month
          </h3>

          {/* ===== Present Desktop ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-yellow-400 rounded-full" />
            </div>
            {/* ============Present================= */}
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-green-600 font-medium">Present</span>
                <span className="text-gray-700">20 Days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-green-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* ===== Late ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-yellow-500 font-medium">Late</span>
                <span className="text-gray-700">02 Days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-yellow-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* ===== Absent ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rotate-45 rounded-sm" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-red-500 font-medium">Absent</span>
                <span className="text-gray-700">02 Days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        {/* ================Monthly Status Mobile================= */}
        <div className="flex lg:hidden flex-col space-y-2 bg-white p-2 rounded-[12px] lg:rounded-2xl">
          {/* Today | Present */}
          <div className="flex items-center justify-evenly border rounded-[8px] lg:rounded-2xl px-4 py-3   ">
            <span className="text-gray-700 font-medium">Today</span>

            <span className="w-px h-5 bg-gray-300"></span>

            <span className="flex items-center gap-2 font-medium text-gray-700">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Present
            </span>
          </div>
          <h2 className="text-textc1-700 font-semibold text-[17px] font-lexend">
            This month
          </h2>
          <div className="grid grid-cols-3 p-2 lg:p-4 border border-gray-100 rounded-md lg:rounded-2xl divide-x-2 text-sm">
            <div className="flex flex-col items-center justify-center space-y-2  text-center">
              <h2 className="text-green-500 text-center text-[14px]">
                Present
              </h2>
              <p className="text-textc1-700 text-center text-[17px]">20 Days</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2  text-center">
              <h2 className="text-red-500 text-center text-[14px]">Absent</h2>
              <p className="text-textc1-700 text-center text-[17px]">02 Days</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2  text-center">
              <h2 className="text-yellow-500 text-center text-[14px]">Late</h2>
              <p className="text-textc1-700 text-center text-[17px]">02 Days</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="hidden lg:block bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-700">August 2025</h3>
            <Calendar size={18} />
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {calendarDays.flat().map((day, i) => (
              <div
                key={i}
                className={`w-8 h-8 flex items-center justify-center text-sm rounded-full
                ${
                  day === 14
                    ? "bg-[#6C5DD3] text-white"
                    : "text-gray-600 hover:bg-[#F1EDFF]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col space-y-1 lg:space-y-4">
        {/* Homework */}
        <div
          className={`${studentHomeworkByClass.length <= 0 ? "hidden" : "flex"} flex-col lg:rounded-2xl  lg:bg-white   lg:p-5 relative`}
        >
          <div className="flex justify-between mb-1 items-center">
            <h3 className="font-lexend font-semibold text-[17px] lg:text-2xl text-textc1-700">
              Homework today
            </h3>

            <Link
              to="/student/homework"
              className="text-[14px] lg:text-2xl text-primary-700"
            >
              See All
            </Link>
          </div>
          <button
            className={`${studentHomeworkByClass && studentHomeworkByClass.length > 0 ? "lg:absolute lg:block hidden " : "hidden"}  p-2 rounded-full bg-primary-700/80 text-white right-20 top-1/2`}
          >
            <ChevronRight />
          </button>
          {studentHomeworkByClass && studentHomeworkByClass.length > 0 ? (
            <div className="flex flex-col space-y-2 lg:space-y-0 lg:grid grid-cols-3 lg:gap-4 overflow-x-auto">
              {studentHomeworkByClass.map((s, i) => (
                <Link
                  to={`homework/${s._id}`}
                  key={i}
                  className="flex bg-white flex-row lg:flex-col space-x-2 items-start lg:space-y-4 rounded-[12px] lg:rounded-xl  p-2 lg:p-4 "
                >
                  <img
                    className="rounded-md lg:rounded-lg w-[76px] h-[76px] lg:w-auto lg:h-auto max-w-96"
                    src={s.image}
                    alt=""
                  />
                  <div className="flex flex-col  justify-start space-y-1 lg:space-y-0">
                    <p className="text-[17px] lg:text-2xl text-textc1-700  font-kalpurush">
                      {s.subject}
                    </p>
                    <p className="text-[12px] lg:text-[14px] textc2-700 text-gray-400 capitalize">
                      {s.teacher}
                    </p>
                    <p className="text-[12px]  textc3-700 text-gray-400 capitalize">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-200 flex flex-col items-center justify-center rounded-2xl">
              <h2 className="text-gray-400 font-lexend">Homeworks Not found</h2>
            </div>
          )}
        </div>
        {/* ==================================================================================================================== */}
        {/* ========================Notice Desktop=================================== */}
        {/* ==================================================================================================================== */}
        <div
          className={`${anouncements.length <= 0 ? "hidden " : "hidden lg:flex"}   flex-col  bg-white rounded-2xl lg:p-5 border border-gray-100 relative`}
        >
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold text-[17px] lg:text-2xl text-textc1-700 font-lexend">
              Importent Notice
            </h3>

            <Link to="notice" className="text-2xl text-primary-700">
              See All
            </Link>
          </div>
          <button
            className={`${anouncements && anouncements.length > 0 ? "absolute" : "hidden"}  p-2 rounded-full bg-primary-700/80 text-white right-20 top-1/2`}
          >
            <ChevronRight />
          </button>

          {anouncements && anouncements.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 overflow-x-auto">
              {anouncements.map((anouncement) => (
                <NoticeAnnouncement
                  title={anouncement.title}
                  descriptions={anouncement.descriptions}
                  teacher={anouncement.teacher}
                  comment={anouncement.conmment}
                  id={anouncement._id}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-200 flex flex-col items-center justify-center rounded-2xl">
              <h2 className="text-gray-400 font-lexend">
                Homeworks Notice Found
              </h2>
            </div>
          )}
        </div>

        {/* ==================================================================================================================== */}
        {/* ========================Notice Mobile=================================== */}
        {/* ==================================================================================================================== */}
        <div
          className={`${anouncements.length <= 0 ? "hidden " : "flex lg:hidden"} flex-col   lg:bg-white lg:p-2  py-2`}
        >
          <div className="flex justify-between mb-1 items-center">
            <h3 className="font-semibold text-[17px] font-lexend lg:text-2xl text-textc1-700">
              Importent Notice
            </h3>
            <Link to="notice" className="text-[14px]  text-primary-700">
              See All
            </Link>
          </div>

          {anouncements && anouncements.length > 0 ? (
            <div className="flex flex-col space-y-2 lg:grid lg:grid-cols-3 lg:gap-4 overflow-x-auto">
              {anouncements.map((anouncement) => (
                <NoticeAnnouncementMobile
                  title={anouncement.title}
                  descriptions={anouncement.descriptions}
                  teacher={anouncement.teacher}
                  comment={anouncement.conmment}
                  id={anouncement._id}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-200 flex flex-col items-center justify-center rounded-2xl">
              <h2 className="text-gray-400 font-lexend">
                Homeworks Notice Found
              </h2>
            </div>
          )}
        </div>

        {/* ==================================================================================================================== */}
        {/* ========================Popular News Desktop=================================== */}
        {/* ==================================================================================================================== */}
        <div className="hidden lg:flex flex-col bg-white rounded-2xl lg:p-5 border border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold  text-[17px] font-lexend lg:text-2xl text-textc1-700">
              Popular News
            </h3>
          </div>

          {newsBySchool && newsBySchool.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {newsBySchool.map((s, i) => (
                <Link
                  to={`news/${s._id}`}
                  className="col-span-1 flex flex-col space-y-4 border border-blue-100 p-4 rounded-2xl"
                >
                  <img className="rounded-2xl" src={s.image} alt="" />
                  <p className="text-sm text-textc3-700">12 january</p>
                  <p className="text-textc2-700 text-md font-kalpurush">
                    {s.descriptions}
                    <span className="text-primary-700 text-md font-sans">
                      Read more..
                    </span>
                  </p>
                  <div className="grid grid-cols-2 border border-blue-100 p-3 rounded-lg ">
                    <span className="col-span-1 flex items-center justify-center gap-1 text-textc1-700">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">0</span>
                    </span>

                    <span className="col-span-1 flex items-center justify-center gap-1 text-textc1-700">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">0</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-200 flex flex-col items-center justify-center rounded-2xl">
              <h2 className="text-gray-400 font-lexend">
                Homeworks Notice Found
              </h2>
            </div>
          )}
        </div>

        {/* ==================================================================================================================== */}
        {/* ========================Popular News Mobile=================================== */}
        {/* ==================================================================================================================== */}
        <div className="lg:hidden flex flex-col   ">
          <div className="flex justify-between mb-1 items-center">
            <h3 className="font-semibold font-lexend text-[17px] lg:text-2xl text-textc1-700">
              Popular News
            </h3>
          </div>

          {newsBySchool && newsBySchool.length > 0 ? (
            <div className="flex flex-col items-center justify-between space-y-2">
              {newsBySchool.map((s, i) => (
                <Link
                  to={`news/${s._id}`}
                  className=" flex flex-row items-center justify-start space-x-4  p-2 rounded-[12px] bg-white"
                >
                  <img
                    className="rounded-md w-[65px] h-[65px] lg:w-[76px] lg:h-[76px]"
                    src={s.image}
                    alt=""
                  />

                  <div className="flex flex-col items-start justify-start space-y-1 lg:space-y-4">
                    <p className="text-gray-700 text-[12px] lg:text-[17px] line-clamp-2 font-kalpurush">
                      {s.descriptions}
                    </p>
                    <div className="flex flex-row items-start justify-start text-[12px]   rounded-lg space-x-6 text-textc2-700 lg:text-[14px]">
                      <span className="col-span-1 text-center flex items-center justify-center text-[12px] lg:text-[14px]">
                        <Eye size={18} />

                        <span className="pl-1 text-[14px] ">32</span>
                      </span>
                      <span className="col-span-1 flex items-center justify-center text-[12px] lg:text-[14px]">
                        <Heart size={18} />

                        <span className="pl-1 text-[14px] ">2K</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-200 flex flex-col items-center justify-center rounded-2xl">
              <h2 className="text-gray-400 font-lexend">
                Homeworks Notice Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

const NoticeAnnouncement = ({
  title,
  descriptions,

  teacher,

  id,
}) => {
  return (
    <Link
      to={`notice/${id}`}
      className="col-span-1 flex flex-col space-y-4 border border-gray-100 p-4 rounded-2xl"
    >
      <div className="flex flex-row items-center justify-between border border-gray-100 rounded-2xl p-2">
        <div className="flex flex-row items-center justidy-start space-x-4">
          <img
            className="w-[65px] h-[67px] lg:w-[54px] lg:h-[56px]"
            src={Notice2}
            alt=""
          />
          <div>
            <h2 className="text-[17px] font-lexend">Announcement</h2>
            <h2 className="text-[14px] text-gray-500 capitalize">{teacher}</h2>
            <p className="text-[14px] text-gray-400">30/12/25</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className=" font-semibold font-kalpurush  text-[17px]">{title}</h2>
        <p className="text-lg text-gray-500 ">
          <span className="font-kalpurush line-clamp-3 text-[17px] text-justify">
            {descriptions}
          </span>
          <span className="text-[#9542E7] text-[17px]">Read More..</span>
        </p>
      </div>
      <div className="grid grid-cols-2 border border-gray-100 p-3 rounded-lg ">
        <span className="col-span-1 text-center flex items-center justify-center">
          <Eye /> <span className="pl-1">0</span>
        </span>
        <span className="col-span-1 flex items-center justify-center">
          <Heart /> <span className="pl-1">0</span>
        </span>
      </div>
    </Link>
  );
};
const NoticeAnnouncementMobile = ({ title, descriptions, id }) => {
  return (
    <Link
      to={`notice/${id}`}
      className="bg-white flex flex-row items-center justify-between rounded-[12px] p-2"
    >
      <div className="flex flex-row items-center justidy-start space-x-2">
        <img className="w-[65px]" src={Notice2} alt="" />
        <div className="flex flex-col items-start ">
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-[14px] font-lexend">Announcement</h2>
            <div className="text-textc2-700">
              <TiPin />
            </div>
          </div>
          <h2 className="text-[12px]  text-gray-500 capitalize font-kalpurush">
            {title}
          </h2>
          <p className="text-[12px] text-gray-400 line-clamp-1 font-kalpurush">
            {descriptions}
          </p>
        </div>
      </div>
    </Link>
  );
};
