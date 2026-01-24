import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight, BookOpen, MoveLeft, Trash2 } from "lucide-react";
import { GoPlus } from "react-icons/go";
import ClassAddModal from "../components/ClassAddModal";
import { useStudent } from "../contexts/studentContext";
import ClassDeleteModal from "../components/ClassDeleteModal";
import { toast } from "react-toastify";
import { useClass } from "../contexts/classContext";

const HomeWork = () => {
  const { classes, deleteClass } = useClass();
  const { students } = useStudent();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const filterStudent = (cls) =>
    students.filter((student) => student.classId === cls).length;

  const handleDelete = async () => {
    try {
      await deleteClass(deleteId);
      setDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className=" ">
        {/* ===== Header ===== */}
        <div className="flex flex-row items-center justify-between lg:bg-white p-4 lg:py-8 rounded-t-2xl lg:border-b-[1px] lg:border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="flex flex-row items-start justify-start space-x-2 "
          >
            <MoveLeft className="" />
            <h1 className="text-[17px] lg:text-[24px] font-semibold text-gray-800">
              Class List
            </h1>
          </button>

          <button
            className=" flex-row items-center justify-center space-x-2 px-8 py-3 rounded-[10px] bg-[#9542e7] text-white hidden lg:flex"
            onClick={() => setOpen(true)}
          >
            <GoPlus className="text-2xl " />
            <span>Add Class</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 lg:bg-white  lg:p-6 ">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="col-span-1 flex flex-row items-center justify-between px-4 lg:px-6 py-4 lg:py-8 border border-gray-100 rounded-2xl  lg:space-x-4 bg-white"
            >
              <div className="flex flex-col items-start justify-between w-full space-y-3 lg:space-y-6">
                <span className="text-[17px] ">Class</span>
                <div className="text-2xl lg:text-3xl font-semibold lg:font-bold  text-gray-800">
                  {classItem.name}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between w-full space-y-3 lg:space-y-6">
                <button
                  onClick={() => {
                    (setDeleteModal(true), setDeleteId(classItem._id));
                  }}
                  className="text-rose-500 bg-rose-500/20 p-2  rounded-xl flex"
                >
                  <Trash2 />
                </button>
                <Link
                  to={`${classItem.name}`}
                  className="text-gray-900 p-3 bg-gray-100  rounded-xl"
                >
                  <MoveRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className="flex  mt-4 lg:hidden  flex-row items-center justify-center space-x-2 px-8 py-2  h-[48px] rounded-[10px] bg-[#9542e7] text-white w-full"
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
          <div className="relative bg-white w-[90%] max-w-[400px] rounded-xl p-6 z-10">
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

export default HomeWork;
