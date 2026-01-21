import { Outlet } from "react-router-dom";
import Sidebar from "./sidebars/StudentSidebar";
import Header from "./TeacherHeader";
import MobileBottomNav from "./BottomNav/TeacherMobileBottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
};

export default Layout;
