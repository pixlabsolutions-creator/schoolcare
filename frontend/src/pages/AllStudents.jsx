import { useEffect, useRef, useState } from "react";
import {
  EllipsisVertical,
  KeyRound,
  MoveLeft,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useStudent } from "../contexts/studentContext";
import Icon from "../assets/icon.png";
import BlockModal from "../components/ui/BlockModal";
import { replace, useNavigate } from "react-router-dom";

const AllStudents = () => {
  const { students } = useStudent();
  const [activeStudentId, setActiveStudentId] = useState(null);

  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleToggle = (id) => {
    setActiveStudentId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setActiveStudentId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const titels = [
    {
      name: "block",
      icon: KeyRound,
    },
    {
      name: "restricted",
      icon: TriangleAlert,
    },
    {
      name: "delete",
      icon: Trash2,
    },
  ];

  return (
    <div className="lg:bg-white min-h-screen rounded-2xl pb-20">
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
      <div className="bg-white  hidden lg:block">
        {/* Header */}
        <div className="grid grid-cols-12 border-b border-gray-100 py-3 px-4 text-[20px] text-textc1-700">
          <p className="col-span-1"></p>
          <p className="col-span-2">Student ID</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-2"></p>
          <p className="col-span-2">Roll</p>
          <p className="col-span-2">Class</p>
          <p className="col-span-1"></p>
        </div>

        {/* Rows */}
        {students.map((student, index) => (
          <div
            ref={
              activeStudentId === (student._id || student.studentId)
                ? modalRef
                : null
            }
            key={student._id || index}
            className="relative grid grid-cols-12 items-center px-4 py-3 text-[17px] text-textc2-700 hover:bg-gray-50"
          >
            <p className="col-span-1">{index + 1}</p>
            <p className="col-span-2">{student.studentId}</p>
            <p className="col-span-2">{student.name}</p>
            <p className="col-span-2"></p>
            <p className="col-span-2">{student.roll}</p>
            <p className="col-span-2">{student.classId}</p>

            {/* Ellipsis */}
            <button
              className="col-span-1 flex justify-center"
              onClick={() => handleToggle(student._id || student.studentId)}
            >
              <EllipsisVertical size={16} />
            </button>

            {/* ✅ Modal (image এর মতো position) */}
            {activeStudentId === (student._id || student.studentId) && (
              <div className="absolute right-6 top-10 z-50">
                <BlockModal titels={titels} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= Mobile Card View ================= */}
      <div className="flex flex-col space-y-2 lg:hidden">
        {students.map((student, index) => (
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
    </div>
  );
};

export default AllStudents;
