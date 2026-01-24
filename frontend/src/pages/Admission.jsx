import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MoveRight,
  BookOpen,
  MoveLeft,
  UsersRound,
  Trash2,
} from "lucide-react";
import { GoPlus } from "react-icons/go";
import ClassAddModal from "../components/ClassAddModal";
import { useClass } from "../contexts/classContext";
import { useStudent } from "../contexts/studentContext";
import ClassDeleteModal from "../components/ClassDeleteModal";
import { useAuth } from "../contexts/AuthContext";

const Admission = () => {
  const { classes, deleteClass } = useClass();

  const { students } = useStudent();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user.school) return;
    setSchoolId(user.school);
  }, [user]);

  const filterStudent = (cls) =>
    students.filter((student) => student.classId === cls).length;

  const handleDelete = async () => {
    try {
      await deleteClass(deleteId, schoolId);
      setDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lg:bg-white lg:min-h-screen">
      <div className=" ">
        {/* ===== Header ===== */}
        <div className="flex flex-row items-center justify-between lg:px-4 py-2 lg:py-8 rounded-t-2xl lg:border-b-[1px] lg:border-gray-200">
          <div className="flex flex-row items-center justify-start space-x-2">
            <MoveLeft className="flex " />
            <h1 className="text-lg font-semibold text-gray-800">Admission</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:bg-white lg:p-6">
          <div className="col-span-1 flex flex-row items-center justify-between p-4 lg:px-6  lg:py-8 border bg-[#9542E71A]/10 border-blue-100 rounded-2xl space-x-4">
            <div className="flex flex-col items-start justify-between w-full space-y-2 lg:space-y-6">
              <span className="text-lg ">See All Students</span>
              <div className="text-2xl lg:text-3xl font-semibold lg:font-bold  text-gray-800">
                {students.length}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between w-full space-y-4">
              <h2 className="text-[#9542E71A]/70 bg-white/90 p-3 border-2 border-gray-200 rounded-full hidden lg:flex">
                <UsersRound size={17} />
              </h2>
              <Link
                to="allstudents"
                className="text-gray-900 p-2 lg:p-3 bg-white border border-gray-300 rounded-full"
              >
                <MoveRight size={17} />
              </Link>
            </div>
          </div>
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="col-span-1 bg-white flex flex-row items-center justify-between p-2 lg:px-6  lg:py-8 rounded-2xl space-x-4 lg:border border-gray-100"
            >
              <div className="flex flex-col items-start justify-between w-full space-y-2 lg:space-y-6">
                <span className="text-[17px] ">
                  Class
                  <span className="px-2 text-textc2-700 text-[17px]">
                    {filterStudent(classItem.name)}
                  </span>
                </span>
                <div className="text-2xl lg:text-3xl font-semibold lg:font-bold  text-gray-800 capitalize">
                  {classItem.name}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between w-full space-y-2 lg:space-y-6">
                <button
                  className="text-rose-500 bg-rose-500/20 p-2 lg:p-3  rounded-lg"
                  onClick={() => {
                    (setDeleteModal(true), setDeleteId(classItem._id));
                  }}
                >
                  <Trash2 size={17} />
                </button>
                <Link
                  to={`${classItem.name}`}
                  className="text-gray-900 p-2 lg:p-3 bg-white border border-gray-300 rounded-lg lg:rounded-full"
                >
                  <MoveRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className="flex mt-16 lg:hidden  flex-row items-center justify-center space-x-2 px-8 py-2  h-[48px] rounded-[10px] bg-[#9542e7] text-white w-full"
            onClick={() => setOpen(true)}
          >
            <GoPlus className="text-2xl " />
            <span>Add Class</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Modal box */}
          <div className="relative bg-white w-[90%] max-w-md rounded-xl p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Class</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <ClassAddModal setOpen={setOpen} />
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDeleteModal(false)}
          />

          {/* Modal box */}
          <div className="relative bg-white w-[90%] max-w-[380px] rounded-xl p-2 lg:p-6 z-10">
            <ClassDeleteModal
              setDeleteModal={setDeleteModal}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admission;
