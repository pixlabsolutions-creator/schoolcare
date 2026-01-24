import {
  Check,
  EllipsisVertical,
  KeyRound,
  MoveLeft,
  Trash2,
  TriangleAlert,
  Lock,
} from "lucide-react";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../contexts/studentContext";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BlockModal from "../components/ui/BlockModal";
import Icon from "../assets/icon.png";
import ClassDeleteModal from "../components/ClassDeleteModal";

const ClassWiseStudents = () => {
  const { name } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (name && user?.school) {
      fetchClassWiseStudent(name, user.school);
    }
  }, [name, user]);

  const {
    fetchClassWiseStudent,
    classStudents,
    statusStudent,
    setOpenModal,
    openModal,
    deleteStudent,
  } = useStudent();

  const [activeStudentId, setActiveStudentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const mobileModalRefs = useRef({});
  const desktopModalRefs = useRef({});

  const handleToggle = (id) => {
    setActiveStudentId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isMobileClickOutside = Object.values(mobileModalRefs.current).every(
        (ref) => ref && !ref.contains(e.target),
      );

      const isDesktopClickOutside = Object.values(
        desktopModalRefs.current,
      ).every((ref) => ref && !ref.contains(e.target));

      if (isMobileClickOutside && isDesktopClickOutside && activeStudentId) {
        setActiveStudentId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeStudentId]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen lg:bg-white rounded-2xl">
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
        {classStudents.map((student) => {
          const isBlocked = student.status === "block";
          const isRestricted = student.status === "restricted";

          const titels = [
            {
              name: isBlocked ? "unlock" : "block",
              icon: isBlocked ? Lock : KeyRound,
            },
            {
              name: isRestricted ? "unrestricted" : "restricted",
              icon: isRestricted ? Check : TriangleAlert,
            },
            { name: "delete", icon: Trash2 },
          ];

          return (
            <div
              key={student._id}
              className="relative bg-white p-2 rounded-[12px]"
            >
              <div className="flex justify-between items-center p-2 border border-gray-100 rounded-[12px]">
                <div className="flex items-center space-x-2">
                  <img
                    className="w-[51px] rounded-[8px]"
                    src={Icon}
                    alt="Icon"
                  />
                  <div>
                    <h3 className="text-[14px] lg:text-[17px] text-black">
                      {student.name}
                    </h3>
                    <p className="text-[12px] text-gray-500">
                      Student ID: {student.studentId}
                    </p>
                  </div>
                  {isBlocked && (
                    <span className="bg-gradient-to-t from-rose-600 to-rose-500 rounded-full px-2 py-1 text-xs text-white">
                      {" "}
                      Blocked
                    </span>
                  )}
                  {isRestricted && (
                    <span className="bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-full px-2 py-1 text-xs text-white">
                      {" "}
                      Restricted
                    </span>
                  )}
                </div>

                <button onClick={() => handleToggle(student._id)}>
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

              {/* মোবাইল মডাল */}
              {activeStudentId === student._id && (
                <div
                  ref={(el) => (mobileModalRefs.current[student._id] = el)}
                  className="absolute right-6 top-10 z-50"
                >
                  <BlockModal
                    titels={titels}
                    setOpenModal={setOpenModal}
                    setDeleteId={setDeleteId}
                    schoolId={student._id}
                    statusUpdate={statusStudent}
                    onClose={() => setActiveStudentId(null)}
                    handleToggle={handleToggle}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* মোবাইল বাটন */}
      <div className="bottom-1 lg:hidden">
        <Link
          to="form"
          className="w-full flex-row mt-4 items-center justify-center space-x-2 px-8 py-2 rounded-[10px] bg-[#9542e7] text-white flex"
        >
          <GoPlus className="text-2xl " />
          <span className="text-[17px] font-lexend">Admit Students</span>
        </Link>
      </div>

      {/* ===== ডেস্কটপ ভার্শন ===== */}
      {/* ডেস্কটপ হেডার */}
      <div className="hidden lg:flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white px-4 py-8 rounded-t-2xl lg:border-b-2 lg:border-gray-200">
        <div className="flex flex-col lg:space-y-0 lg:flex-row items-center justify-between space-x-4">
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
          className="flex-row items-center justify-center space-x-2 px-8 py-3 rounded-[10px] bg-[#9542e7] text-white hidden lg:flex"
          to="form"
        >
          <GoPlus className="text-2xl " />
          <span className="text-[17px] font-lexend">Admit Students</span>
        </Link>
      </div>

      {/* ডেস্কটপ টেবিল */}
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
          {classStudents.map((student, index) => {
            const isBlocked = student.status === "block";
            const isRestricted = student.status === "restricted";

            const titels = [
              {
                name: isBlocked ? "unlock" : "block",
                icon: isBlocked ? Lock : KeyRound,
              },
              {
                name: isRestricted ? "unrestricted" : "restricted",
                icon: isRestricted ? Check : TriangleAlert,
              },
              { name: "delete", icon: Trash2 },
            ];

            return (
              <div
                key={student._id}
                className="relative hover:bg-gray-50 transition grid grid-cols-12 text-[17px] text-textc2-700 py-2 items-center px-4"
              >
                <p className="col-span-1 px-3 py-2">{index + 1}</p>
                <p className="col-span-2 px-3 py-2">{student.studentId}</p>
                <p className="col-span-2 px-3 py-2">{student.name}</p>
                <p className="col-span-2 px-3 py-2">
                  {isBlocked && (
                    <span className="bg-gradient-to-t from-rose-600 to-rose-500 rounded-full px-2 py-1 text-xs text-white">
                      {" "}
                      Blocked
                    </span>
                  )}
                  {isRestricted && (
                    <span className="bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-full px-2 py-1 text-xs text-white">
                      {" "}
                      Restricted
                    </span>
                  )}
                </p>
                <p className="col-span-2 px-3 py-2">{student.roll}</p>
                <p className="col-span-2 px-3 py-2">{student.classId}</p>
                <button
                  className="col-span-1"
                  onClick={() => handleToggle(student._id)}
                >
                  <EllipsisVertical size={16} />
                </button>

                {/* ডেস্কটপ মডাল */}
                {activeStudentId === student._id && (
                  <div
                    ref={(el) => (desktopModalRefs.current[student._id] = el)}
                    className="absolute right-6 top-10 z-50"
                  >
                    <BlockModal
                      titels={titels}
                      setOpenModal={setOpenModal}
                      setDeleteId={setDeleteId}
                      schoolId={student._id}
                      statusUpdate={statusStudent}
                      onClose={() => setActiveStudentId(null)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ডিলিট মডাল */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenModal(false)}
          />
          <div className="relative bg-white w-[90%] max-w-[380px] rounded-xl p-2 lg:p-6 z-10">
            <ClassDeleteModal
              setDeleteModal={setOpenModal}
              handleDelete={deleteStudent}
              id={deleteId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassWiseStudents;
