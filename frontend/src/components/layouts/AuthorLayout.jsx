import { Outlet } from "react-router-dom";

import MobileBottomNav from "../BottomNav/TeacherMobileBottomNav";
import AdminSidebar from "../sidebars/AdminSidebar";
import AdminHeader from "../header/AdminHeader";

const AuthorLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
};

export default AuthorLayout;
