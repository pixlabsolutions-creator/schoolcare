import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

import CalendarHeader from "../components/CalendarHeader";
import HomeWorkSubjectCard from "../components/HomeWorkSubjectCard";
import { useHomework } from "../contexts/HomeworkContext";
import { useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

const HomeworkPage = () => {
  const { loading, studentHomeworkByClass, fetchHomeworksByClassForStudent } =
    useHomework();

  const { user } = useAuth();

  // useCallback দিয়ে fetchData function টি memoize করুন
  const fetchData = useCallback(async () => {
    if (!user) {
      return;
    }
    await fetchHomeworksByClassForStudent(user?.classId, user?.school);
  }, [user?.classId, user?.school]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="lg:bg-white/90 flex flex-col space-y-0 lg:space-y-4 lg:min-h-screen p-4 lg:p-0 pb-20 lg:rounded-2xl">
      {/* ===== Header ===== */}
      <Header />

      {/* ===== Date Selector ===== */}
      <div className="py-4 lg:p-4">
        <CalendarHeader />
      </div>

      {/* ===== Homework List ===== */}
      <div className=" lg:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading...</p>
        ) : studentHomeworkByClass.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No homework found
          </p>
        ) : (
          studentHomeworkByClass.map((item) => {
            return <HomeWorkSubjectCard key={item._id} {...item} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomeworkPage;

/* ===== Helper Components ===== */
const Header = () => (
  <div className="flex flex-row items-center justify-between lg:bg-white  pt-4 rounded-lg  lg:rounded-t-2xl lg:border-b lg:border-blue-50 lg:py-8">
    <div className="flex flex-row items-center space-x-3 border-0 lg:ml-4">
      <Link to="/">
        <MoveLeft className="" />
      </Link>
      <h1 className="text-[14px] lg:text-2xl font-semibold text-gray-800">
        Homework{" "}
      </h1>
    </div>
  </div>
);
