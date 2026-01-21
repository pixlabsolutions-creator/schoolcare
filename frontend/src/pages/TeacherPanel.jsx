import {
  EllipsisVertical,
  KeyRound,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Icon from "../assets/icon.png";
import { Link, useParams } from "react-router-dom";
import BlockModal from "../components/ui/BlockModal";
import { useSchool } from "../contexts/SchoolContext";
import ClassDeleteModal from "../components/ClassDeleteModal";
import { useAuth } from "../contexts/AuthContext";

const TeacherPanel = () => {
  const { id } = useParams();
  const { fetchSchoolById, schoolById } = useSchool();

  const { fetchTeachersBySchool, teachers } = useAuth();
  useEffect(() => {
    if (!id) return;
    fetchSchoolById(id);
  }, []);

  useEffect(() => {
    if (!schoolById) return;
    fetchTeachersBySchool(schoolById["data"]?.school);
  }, []);

  const { schools, deleteSchool, openModal, setOpenModal } = useSchool();
  const [activeSchoolId, setActiveSchoolId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const modalRef = useRef(null);

  const handleToggle = (id) => {
    setActiveSchoolId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setActiveSchoolId(null);
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
    <div className="lg:bg-white lg:min-h-screen rounded-2xl">
      <div className="flex flex-row items-center justify-between border-b-2 border-gray-100 p-6 lg:py-8">
        <div className="flex flex-row items-center justify-start space-x-2 text-[17px] lg:text-[24px] font-lexend">
          <h2 className="text-[17px] lg:text-[24px] text-black">
            Total Teacher
          </h2>
          <span className="text-gray-600">{teachers?.length}</span>
        </div>
        <Link
          to="addteacher"
          className="flex flex-row items-center font-lexend bg-primary-700 text-white px-6 py-3 rounded-lg text-[17px] lg:text-[20px]"
        >
          <span>
            <Plus />
          </span>
          <span>Add Teacher</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {teachers.map((teacher, i) => (
          <div
            ref={activeSchoolId === teacher._id ? modalRef : null}
            className={` col-span-1 flex flex-col items-start justify-start border border-gray-100 p-[12px] rounded-[14px] space-y-2 relative`}
            key={i}
          >
            <div className="w-full flex flex-row items-center justify-between p-[10px] border border-gray-100 rounded-[12px]">
              <div className="flex flex-row items-center justify-start space-x-2">
                <img
                  className="w-[54px] h-[54px] rounded-[10px]"
                  src={Icon}
                  alt=""
                />
                <div className="font-lexend">
                  <h2 className="text-[14px] font-semibold">
                    {teacher.username}
                  </h2>
                  <p className="text-[12px]">ID: {teacher.userId}</p>
                </div>
              </div>
              <button onClick={() => handleToggle(teacher._id)}>
                <EllipsisVertical size={17} />
              </button>

              {activeSchoolId === teacher._id && (
                <div className="absolute right-6 top-10 z-50">
                  <BlockModal
                    titels={titels}
                    setOpenModal={setOpenModal}
                    setDeleteId={setDeleteId}
                    schoolId={teacher._id}
                  />
                </div>
              )}
            </div>
            <div className="text-[14px]">Address: {teacher.address}</div>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenModal(false)}
          />

          <div className="relative bg-white w-[90%] max-w-[380px] rounded-xl p-2 lg:p-6 z-10">
            <ClassDeleteModal
              setDeleteModal={setOpenModal}
              handleDelete={deleteSchool}
              id={deleteId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
