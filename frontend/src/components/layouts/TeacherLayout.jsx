import { Outlet } from "react-router-dom";
import TeacherSidebar from "../sidebars/TeacherSidebar";
import TeacherMobileBottomNav from "../BottomNav/TeacherMobileBottomNav";
import TeacherHeader from "../header/TeacherHeader";

const TeacherLayout = () => {
  return (
    <div className="flex flex-col bg-[#F7F8FA] ">
      <TeacherHeader />
      <div className=" flex flex-row">
        <TeacherSidebar />
        <main className="flex-1 p-[15px] lg:p-[20px] min-h-screen pb-20 relative">
          <Outlet />
        </main>

        <TeacherMobileBottomNav />
      </div>
    </div>
  );
};

export default TeacherLayout;
