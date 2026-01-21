import { Link, useNavigate } from "react-router-dom";
import { MoveRight, BookOpen, MoveLeft, UsersRound } from "lucide-react";
import { useClass } from "../contexts/classContext";
import { useStudent } from "../contexts/studentContext";

const Attendance = () => {
  const { classes } = useClass();
  const { students } = useStudent();
  const navigate = useNavigate();
  const filterStudent = (cls) =>
    students.filter((student) => student.classId === cls).length;
  return (
    <div className="min-h-screen lg:bg-white rounded-2xl">
      <div className=" ">
        {/* ===== Header ===== */}
        <div className="flex flex-row items-center justify-between lg:bg-white  py-4 lg:py-8 lg:px-4 rounded-t-2xl lg:border-b-[1px] lg:border-gray-200">
          <div className="flex flex-row items-start justify-start space-x-2">
            <button onClick={() => navigate(-1)}>
              <MoveLeft className="flex " />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Attendance</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 lg:bg-white  lg:p-6">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="col-span-1 flex flex-row items-center justify-between px-4 lg:px-6 py-4 lg:py-8 border bg-white border-gray-100 rounded-2xl space-x-4"
            >
              <div className="flex flex-col items-start justify-between w-full space-y-2 lg:space-y-6">
                <div className="flex flex-row items-center justify-start space-x-2">
                  <span className="text-lg ">Class</span>
                  <span className="hidden lg:block text-textc2-700 text-[17px]">
                    {filterStudent(classItem.name)}
                  </span>
                </div>
                <div className="text-2xl lg:text-3xl font-semibold lg:font-bold  text-gray-800">
                  {classItem.name}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between w-full space-y-2 lg:space-y-4">
                <h2 className="text-[#7efff5] bg-[#7efff5]/20 p-3  rounded-full hidden lg:flex">
                  <BookOpen />
                </h2>
                <span className="block lg:hidden text-textc2-700 text-[17px] px-2">
                  {filterStudent(classItem.name)}
                </span>
                <Link
                  to={`${classItem.name}`}
                  className="text-gray-900 p-1 lg:p-3 border border-gray-300 rounded-full"
                >
                  <MoveRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
