import { useEffect, useRef, useState } from "react";
import {
  EllipsisVertical,
  KeyRound,
  MoveLeft,
  Trash2,
  TriangleAlert,
  Lock,
  Check,
} from "lucide-react";
import { useStudent } from "../contexts/studentContext";
import Icon from "../assets/icon.png";
import BlockModal from "../components/ui/BlockModal";
import { useNavigate } from "react-router-dom";
import ClassDeleteModal from "../components/ClassDeleteModal";

const AllStudents = () => {
  const { students, deleteStudent, openModal, setOpenModal, statusStudent } =
    useStudent();
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

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

  return (
    <div className="lg:bg-white min-h-screen rounded-2xl pb-20 lg:min-h-screen">
      {/* ===== Header ===== */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 py-4 lg:py-8 lg:px-4 lg:bg-white rounded-t-2xl lg:border-b lg:border-gray-200">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(-1)}>
            <MoveLeft />
          </button>
          <h1 className="text-[14px] lg:text-[24px] font-semibold text-textc1-700">
            All Students
          </h1>
        </div>
        <h2 className="hidden lg:block text-2xl text-primary-700">
          Total Students {students.length}
        </h2>
      </div>

      {/* ===== Mobile total ===== */}
      <div className="flex justify-between items-center lg:hidden text-[17px] px-4 py-3 bg-white rounded-[12px] mb-4">
        <h2 className="text-primary-700">Total Students</h2>
        <span className="text-primary-700">{students.length}</span>
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="bg-white hidden lg:block">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-100 py-3 px-4 text-[20px] text-textc1-700">
          <p className="col-span-1"></p>
          <p className="col-span-2">Student ID</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-2"></p>
          <p className="col-span-2">Roll</p>
          <p className="col-span-2">Class</p>
          <p className="col-span-1"></p>
        </div>

        {/* Table Rows */}
        {students.map((student, index) => {
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
              className="relative grid grid-cols-12 items-center px-4 py-3 text-[17px] text-textc2-700 hover:bg-gray-50"
            >
              <p className="col-span-1">{index + 1}</p>
              <p className="col-span-2">{student.studentId}</p>
              <p className="col-span-2">{student.name}</p>
              <p className="col-span-2">
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
              <p className="col-span-2">{student.roll}</p>
              <p className="col-span-2">{student.classId}</p>

              <button
                className="col-span-1 flex justify-center"
                onClick={() => handleToggle(student._id)}
              >
                <EllipsisVertical size={16} />
              </button>

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
                    handleToggle={handleToggle}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= Mobile Card View ================= */}
      <div className="flex flex-col space-y-2 lg:hidden">
        {students.map((student, index) => {
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
                <div className="grid grid-cols-3">
                  <h2 className="col-span-1">Address: </h2>
                  <h2 className="col-span-2">{student.school}</h2>
                </div>
                <div className="grid grid-cols-3">
                  <h2 className="col-span-1">Role: </h2>
                  <h2 className="col-span-2">{student.roll}</h2>
                </div>
                <div className="grid grid-cols-3">
                  <h2 className="col-span-1">Class: </h2>
                  <h2 className="col-span-2">{student.classId}</h2>
                </div>
              </div>

              {/* Mobile Modal */}
              {activeStudentId === student._id && (
                <div
                  ref={(el) => (mobileModalRefs.current[student._id] = el)}
                  className="absolute right-3 top-14 z-50"
                >
                  <BlockModal
                    titels={titels}
                    setOpenModal={setOpenModal}
                    setDeleteId={setDeleteId}
                    schoolId={student._id}
                    statusUpdate={statusStudent}
                    handleToggle={handleToggle}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= Delete Modal ================= */}
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

export default AllStudents;
