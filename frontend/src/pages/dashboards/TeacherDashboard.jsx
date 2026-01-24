import { Eye, Heart, icons, Users } from "lucide-react";
import SectionHeader from "../../components/common/SectionHeader";
import StatCard from "../../components/common/StatCard";

import { useStudent } from "../../contexts/studentContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNews } from "../../contexts/NewsContext";
import NotificationBell from "../../components/NotificationBell";
import { useEffect } from "react";

const TeacherDashboard = () => {
  const { students } = useStudent();
  const { user, fetchTeachersBySchool, teachers } = useAuth();
  const { allNews } = useNews();
  const isDesktop = window.innerWidth >= 768;

  useEffect(() => {
    if (!user?.school) return;
    fetchTeachersBySchool(user?.school);
  }, [user?.school]);
  console.log(allNews);
  return (
    <div className="min-h-screen  space-y-4 lg:bg-white lg:p-4 rounded-2xl">
      <div className="flex flex-row items-center justify-between lg:hidden">
        <SectionHeader title="Good Morning!" subtitle={`☀️ ${user.school}`} />
        <div className="p-2 border border-gray-1-200 rounded-full">
          <NotificationBell />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[15px]">
        {/* Total Teachers */}
        <StatCard
          title="Total Teachers"
          value={teachers?.length || 0}
          {...(isDesktop ? null : { icon: Users })}
          order="order-2 lg:order-4 col-span-1"
        />

        {/* Total Students */}
        <StatCard
          title="Total Students"
          value={students.length}
          {...(isDesktop ? null : { icon: Users })}
          order="order-1 lg:order-3 col-span-1"
        />
      </div>
      <div className="py-2">
        <h2 className="text-[17px]  font-lexend font-semibold pb-2">
          Popular news
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-4">
          {allNews.map((nes) => (
            <div className="col-span-1 flex flex-row items-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 text-sm text-gray-600 bg-white p-[10px] rounded-[12px]">
              <img
                src={nes.image}
                className="w-[76px] lg:w-full lg:h-auto h-[76px] rounded-[10px]"
                alt="img"
              />
              <div className="flex flex-col space-y-1">
                <h3 className="text-[12px] lg:text-[17px] text-gray-600  font-semibold font-kalpurush line-clamp-2">
                  {nes.descriptions}
                </h3>
                <span className="hidden lg:block text-primary-700 text-[14px]">
                  Read More...
                </span>
                <div className="flex flex-row items-center justify-start space-x-8 lg:space-x-0 text-[14px] lg:justify-evenly bg-white lg:py-2 lg:rounded-[12px]">
                  <span className="flex flex-row space-x-1">
                    <Eye size={18} /> <span>32</span>
                  </span>
                  <span className="flex flex-row space-x-1">
                    <Heart size={18} /> <span>1K</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
