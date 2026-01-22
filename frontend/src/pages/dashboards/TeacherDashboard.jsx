import { Eye, Heart, icons, Users } from "lucide-react";
import SectionHeader from "../../components/common/SectionHeader";
import StatCard from "../../components/common/StatCard";
import ProgressBar from "../../components/common/ProgressBar";
import { Link } from "react-router-dom";
import { useStudent } from "../../contexts/studentContext";
import { useAuth } from "../../contexts/AuthContext";

const TeacherDashboard = () => {
  const { students } = useStudent();
  const { user } = useAuth();

  const isDesktop = window.innerWidth >= 768;

  return (
    <div className="min-h-screen  space-y-4 lg:bg-white lg:p-4 rounded-2xl">
      <div className="lg:hidden">
        <SectionHeader
          title="Good Morning!"
          subtitle="☀️ Let’s get ready to go to your school"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[15px]">
        {/* Total Teachers */}
        <StatCard
          title="Total Teachers"
          value={user?.totalTeachers || 10}
          {...(isDesktop ? null : { icon: Users })}
          order="order-2 lg:order-4 col-span-1"
        />
        {/* Average Performance */}
        <StatCard
          title="Average performance"
          order="order-3 lg:order-1 lg:col-span-2"
          {...(isDesktop ? { icon: Users } : { status: "Bad" })}
        >
          <ProgressBar
            value={34}
            gradient="linear-gradient(90deg,#22c55e,#facc15,#fb7185)"
          />
        </StatCard>

        {/* Today Present */}
        <StatCard
          title="Today Present"
          order="order-4 lg:order-2  lg:col-span-2"
          {...(isDesktop ? { status: students.length } : { status: "Good" })}
        >
          <ProgressBar
            value={70}
            gradient="linear-gradient(90deg,#22c55e,#facc15,#fb7185)"
          />
        </StatCard>

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
          <div className="col-span-1 flex flex-row items-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 text-sm text-gray-600 bg-white p-[10px] rounded-[12px]">
            <img
              src="https://picsum.photos/300/200.jpg"
              className="w-[76px] lg:w-full lg:h-auto h-[76px] rounded-[10px]"
              alt="img"
            />
            <div className="flex flex-col space-y-1">
              <h3 className="text-[12px] lg:text-[17px] text-gray-600  font-semibold font-kalpurush line-clamp-2">
                ইউনিক ক্যাপশন বাংলা বা আনকমন ক্যাপশন মানে এমন ক্যাপশন
                যেগুলোইউনিক ক্যাপশন বাংলা বা আনকমন ক্যাপশন মানে এমন ক্যাপশন
                যেগুলো অন্যরকম, আলাদা এবং একদম ইউনিক। ফেসবুকে পোস্ট করার সময়
                আমরা সবাই চাই নতুন কিছু,
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
          <div className="col-span-1 flex flex-row items-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 text-sm text-gray-600 bg-white p-[10px] rounded-[12px]">
            <img
              src="https://picsum.photos/300/200.jpg"
              className="w-[76px] lg:w-full lg:h-auto h-[76px] rounded-[10px]"
              alt="img"
            />
            <div className="flex flex-col space-y-1">
              <h3 className="text-[12px] lg:text-[17px] text-gray-600  font-semibold font-kalpurush line-clamp-2">
                ইউনিক ক্যাপশন বাংলা বা আনকমন ক্যাপশন মানে এমন ক্যাপশন
                যেগুলোইউনিক ক্যাপশন বাংলা বা আনকমন ক্যাপশন মানে এমন ক্যাপশন
                যেগুলো অন্যরকম, আলাদা এবং একদম ইউনিক। ফেসবুকে পোস্ট করার সময়
                আমরা সবাই চাই নতুন কিছু,
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
          <div className="col-span-1 flex flex-row items-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 text-sm text-gray-600 bg-white p-[10px] rounded-[12px]">
            <img
              src="https://picsum.photos/300/200.jpg"
              className="w-[76px] lg:w-full lg:h-auto h-[76px] rounded-[10px]"
              alt="img"
            />
            <div className="flex flex-col space-y-1">
              <h3 className="text-[12px] lg:text-[17px] text-gray-600  font-semibold font-kalpurush line-clamp-2">
                ইউনিক ক্যাপশন বাংলা বা আনকমন ক্যাপশন মানে এমন ক্যাপশন
                যেগুলোইউনিক ক্যাপশন বাংলা বা আনকমন ক্যাপশন মানে এমন ক্যাপশন
                যেগুলো অন্যরকম, আলাদা এবং একদম ইউনিক। ফেসবুকে পোস্ট করার সময়
                আমরা সবাই চাই নতুন কিছু,
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
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
