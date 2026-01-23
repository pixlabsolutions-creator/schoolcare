import { EllipsisVertical, MoveLeft } from "lucide-react";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../contexts/studentContext";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BlockModal from "../components/ui/BlockModal";
import Icon from "../assets/icon.png";
const ClassWiseStudents = () => {
  const { name } = useParams();
  const { user } = useAuth();
  const { fetchClassWiseStudent, classStudents } = useStudent();

  const [activeStudentId, setActiveStudentId] = useState(null);

  const handleToggle = (id) => {
    setActiveStudentId((prev) => (prev === id ? null : id));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (name && user?.school) {
      fetchClassWiseStudent(name, user.school);
    }
  }, [name, user]);

  return (
    <div className="min-h-screen lg:bg-white">
      <div>
        <div className="flex lg:hidden flex-row items-center justify-start space-x-2 py-2">
          <MoveLeft className="" onClick={() => navigate(-1)} />
          <h1 className="">Class {name} </h1>
        </div>
      </div>
      <div className="flex lg:hidden flex-row items-center justify-between bg-white p-4 rounded-[12px] mb-3">
        <h2 className="">Total Students </h2>
        <span className="text-primary-700">{classStudents.length}</span>
      </div>

      <div className="flex flex-col space-y-2 lg:hidden">
        {classStudents.map((student, index) => (
          <div
            key={student._id || index}
            className="relative bg-white p-2 rounded-[12px]"
          >
            <div className="flex justify-between items-center p-2 border border-gray-100 rounded-[12px]">
              <div className="flex items-center space-x-2">
                <img className="w-[51px] rounded-[8px]" src={Icon} alt="Icon" />
                <div>
                  <h3 className="text-[14px] lg:text-[17px] text-black">
                    {student.name}
                  </h3>
                  <p className="text-[12px] text-gray-500">
                    Student ID: {student.studentId}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleToggle(student._id || student.studentId)}
              >
                <EllipsisVertical size={16} />
              </button>
            </div>

            <div className="w-full text-[14px] text-textc2-700 mt-2">
              <div className="grid grid-cols-3 ">
                <h2 className="col-span-1">Address: </h2>
                <h2 className="col-span-2">{student.school}</h2>
              </div>
              <div className="grid grid-cols-3 ">
                <h2 className="col-span-1">Role: </h2>
                <h2 className="col-span-2">{student.roll}</h2>
              </div>
              <div className="grid grid-cols-3 ">
                <h2 className="col-span-1">Class: </h2>
                <h2 className="col-span-2">{student.classId}</h2>
              </div>
            </div>

            {/* Mobile modal */}
            {activeStudentId === (student._id || student.studentId) && (
              <div className="absolute right-3 top-14 z-50">
                <BlockModal titels={titels} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bottom-1">
        <Link
          to="form"
          className=" w-full flex-row mt-4 items-center justify-center space-x-2 px-8 py-2 lg:py-3 rounded-[10px] bg-[#9542e7] text-white lg:hidden flex"
        >
          <GoPlus className="text-2xl " />
          <span className="text-[17px] font-lexend">Admit Students</span>
        </Link>
      </div>

      {/* ===== Header ===== */}
      <div className="hidden lg:flex flex-col lg:flex-row items-start lg:items-center justify-between  bg-white px-4 py-8 rounded-t-2xl lg:border-b-2 lg:border-gray-200">
        <div className="flex flex-col  lg:space-y-0 lg:flex-row items-center justify-between space-x-4">
          <div className="flex flex-row items-center justify-between space-x-2">
            <MoveLeft className="flex lg:hidden" onClick={() => navigate(-1)} />
            <h1 className="text-[24px] font-semibold text-gray-800">
              Class {name}
            </h1>
          </div>
          <h2 className="text-[17px] text-gray-400 font-lexend">
            Total Students {classStudents.length}
          </h2>
        </div>
        <Link
          className=" flex-row items-center justify-center space-x-2 px-8 py-3 rounded-[10px] bg-[#9542e7] text-white hidden lg:flex"
          to="form"
        >
          <GoPlus className="text-2xl " />
          <span className="text-[17px] font-lexend">Admit Students</span>
        </Link>
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-12 border-b border-gray-100 py-3 px-4 text-[20px] text-textc1-700">
          <p className="col-span-1 px-3 py-2"></p>
          <p className="col-span-2 px-3 py-2 ">Student ID</p>
          <p className="col-span-2 px-3 py-2 ">Name</p>
          <p className="col-span-2 px-3 py-2 "></p>
          <p className="col-span-2 px-3 py-2 ">Roll</p>
          <p className="col-span-2 px-3 py-2 ">Class</p>
          <p className="col-span-1 px-3 py-2 "></p>
        </div>
        <div>
          {classStudents.map((student, index) => (
            <div
              key={index}
              className="hover:bg-gray-50 transition grid grid-cols-12 text-[17px] text-textc2-700 py-2 items-center px-4 relative"
            >
              <p className="col-span-1 px-3 py-2 ">{index + 1}</p>
              <p className="col-span-2 px-3 py-2 ">{student.studentId}</p>
              <p className="col-span-2 px-3 py-2 ">{student.name}</p>
              <p className="col-span-2 px-3 py-2 "></p>
              <p className="col-span-2 px-3 py-2 ">{student.roll}</p>
              <p className="col-span-2 px-3 py-2 ">{student.classId}</p>
              <button
                className="col-span-1 "
                onClick={() => handleToggle(student._id || student.studentId)}
              >
                <EllipsisVertical size={16} />
              </button>
              {/* ✅ Modal (image এর মতো position) */}
              {activeStudentId === (student._id || student.studentId) && (
                <div className="absolute right-6 top-10 z-50">
                  <BlockModal />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden flex-col bg-white p-4 lg:p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-2 border">Student ID</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Roll</th>
              <th className="px-3 py-2 border">Class</th>
            </tr>
          </thead>

          <tbody>
            {classStudents.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-3 py-2 border">{student.studentId}</td>
                <td className="px-3 py-2 border">{student.name}</td>
                <td className="px-3 py-2 border">{student.roll}</td>
                <td className="px-3 py-2 border">{student.classId}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile view more */}

        <span className="flex lg:hidden justify-center mt-4 bg-blue-100 rounded-md w-full py-2">
          View More
        </span>
        <Link
          to="form"
          className=" w-full flex-row mt-4 items-center justify-center space-x-2 px-8 py-3 rounded-[10px] bg-[#9542e7] text-white lg:hidden flex"
        >
          <GoPlus className="text-2xl " />
          <span>Admit Students</span>
        </Link>
      </div>
    </div>
  );
};

export default ClassWiseStudents;
