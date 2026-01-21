import { Outlet } from "react-router-dom";
import StudentMobileBottomNav from "../BottomNav/StudentMobileBottomNav";
import StudentSidebar from "../sidebars/StudentSidebar";
import StudentHeader from "../header/StudentHeader";

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA]">
      {/* ===== Header ===== */}
      <div className="fixed top-0 left-0 w-full z-50">
        <StudentHeader />
      </div>

      {/* ===== Content ===== */}
      <div className="flex flex-1 lg:pt-[64px]">
        {" "}
        {/* pt-[64px] = Header height */}
        {/* ===== Sidebar ===== */}
        <div className="hidden lg:block fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-white shadow-md">
          <StudentSidebar />
        </div>
        {/* ===== Main Content ===== */}
        <main className="flex-1 ml-0 lg:ml-64 lg:p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </main>
        {/* ===== Mobile Bottom Nav ===== */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
          <StudentMobileBottomNav />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
