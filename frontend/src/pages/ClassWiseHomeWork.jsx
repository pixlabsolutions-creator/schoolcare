import { Link, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { GoPlus } from "react-icons/go";
import CalendarHeader from "../components/CalendarHeader";
import HomeWorkSubjectCard from "../components/HomeWorkSubjectCard";
import { useHomework } from "../contexts/HomeworkContext";
import { useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

const ClassWiseHomeWork = () => {
  const { name } = useParams();
  const { loading, homeworkByClass, fetchHomeworksByClass } = useHomework();
  const { user } = useAuth();

  // useCallback দিয়ে fetchData function টি memoize করুন
  const fetchData = useCallback(async () => {
    if (!user?.username || !name) {
      return;
    }
    await fetchHomeworksByClass(name, user.username);
  }, [name, user?.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="lg:bg-white lg:rounded-2xl flex flex-col space-y-4 min-h-screen  ">
      {/* ===== Header ===== */}
      <Header name={name} />

      {/* ===== Date Selector ===== */}
      <div className="lg:px-4">
        <CalendarHeader />
      </div>

      {/* ===== Homework List ===== */}
      <div className="lg:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading...</p>
        ) : homeworkByClass.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No homework found
          </p>
        ) : (
          homeworkByClass.map((item) => {
            return <HomeWorkSubjectCard key={item._id} {...item} />;
          })
        )}
      </div>

      {/* ===== Footer Add Button (Mobile) ===== */}
      <div className="flex lg:hidden px-4">
        <AddHomeworkButton fullWidth />
      </div>
    </div>
  );
};

export default ClassWiseHomeWork;

/* ===== Helper Components ===== */
const Header = ({ name }) => (
  <div className="flex flex-row items-center justify-between  lg:border-b lg:border-gray-100 lg:py-8 px-4">
    <div className="flex flex-row items-center space-x-2">
      <Link to="/">
        <MoveLeft className="lg:hidden" />
      </Link>
      <h1 className="text-lg font-semibold text-gray-800">Class {name}</h1>
    </div>
    <AddHomeworkButton className="hidden lg:flex" />
  </div>
);

const AddHomeworkButton = ({ className = "", fullWidth = false }) => (
  <Link
    to="addhomework"
    className={`flex items-center justify-center space-x-2 px-8 py-3 rounded-[10px] bg-[#9542e7] text-white ${
      fullWidth ? "w-full" : ""
    } ${className}`}
  >
    <GoPlus className="text-2xl" />
    <span>Add Homework</span>
  </Link>
);
