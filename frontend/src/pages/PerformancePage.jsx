import { ArrowRight, Calendar, MoveLeft } from "lucide-react";

import StudentImage from "../assets/students.png";
import { useHomework } from "../contexts/HomeworkContext";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const calendarDays = [
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    [28, 29, 30, 31, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
    [1, 2, 3, 4, 5, 6, 7],
  ];

  return (
    <div className="space-y-1 lg:space-y-6 lg:bg-white rounded-lg lg:rounded-xl p-4 pb-20">
      {/* Top Cards */}
      <div className="flex flex-row items-center justify-between lg:bg-white py-4  rounded-t-2xl lg:border-b lg:border-blue-50 lg:py-8">
        <div className="flex flex-row items-center space-x-3 border-0">
          <Link to="/">
            <MoveLeft className="" />
          </Link>
          <h1 className="text-[14px] lg:text-2xl font-semibold text-gray-800">
            Performance{" "}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 lg:p-4">
        {/* Average Performance */}
        <div className="h-full bg-white rounded-lg lg:rounded-2xl lg:border  border-gray-100 overflow-hidden lg:relative">
          <img
            className="hidden lg:flex w-full h-1/2"
            src={StudentImage}
            alt=""
          />

          {/*=================== Average Performance Progress =======================*/}
          <div className="flex flex-col  lg:space-y-4 p-2 lg:p-4 bg-white lg:absolute left-0 right-0 lg:-mt-10 rounded-2xl">
            {/* Today | Present */}
            <div className="hidden lg:flex items-center justify-between border rounded-2xl px-4 py-3  lg:mt-0 ">
              <span className="text-gray-700 font-medium">Today</span>

              <span className="w-px h-5 bg-gray-300"></span>

              <span className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Present
              </span>
            </div>

            <div className=" lg:p-4 lg:border rounded-lg lg:rounded-2xl space-y-4 order-1 lg:order-2">
              <div className="flex items-center flex-row justify-between text-sm ">
                <span className="font-medium text-gray-800">
                  Average performance
                </span>
                <span className="flex  gap-2 text-red-500 font-medium">
                  <span className="flex items-center justify-end text-purple-500 tracking-widest">
                    ···········
                    <ArrowRight className="inline w-3 h-3" />
                  </span>
                  Bad
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "34%",
                    background:
                      "linear-gradient(90deg, #22c55e, #facc15, #fb7185)",
                  }}
                />
              </div>

              {/* Percent */}
              <div className="flex justify-between text-xs">
                <span className="text-red-500 font-medium">34%</span>
                <span className="text-purple-500 font-medium">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Status */}
        <div className="hidden lg:block bg-white rounded-3xl lg:p-4 border border-gray-100 space-y-4">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800">This Month</h3>

          {/* ===== Present Desktop ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-yellow-400 rounded-full" />
            </div>
            {/* ============Present================= */}
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-green-600 font-medium">Present</span>
                <span className="text-gray-700">20 Days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-green-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* ===== Late ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-yellow-500 font-medium">Late</span>
                <span className="text-gray-700">02 Days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-yellow-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* ===== Absent ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rotate-45 rounded-sm" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-red-500 font-medium">Absent</span>
                <span className="text-gray-700">02 Days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:hidden flex-col space-y-2   rounded-lg">
          <h2 className="text-textc1-700 font-semibold">Present</h2>
          {/* Today | Present */}
          <div className="flex items-center justify-evenly border rounded-lg px-4 py-3  bg-white ">
            <span className="text-gray-700 font-medium">Today</span>

            <span className="w-px h-5 bg-gray-300"></span>

            <span className="flex items-center gap-2 font-medium text-gray-700">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Present
            </span>
          </div>
        </div>
        {/* ================Monthly Status Mobile================= */}
        <div className="flex lg:hidden flex-col space-y-2   rounded-lg">
          <h2 className="text-textc1-700 font-semibold">This month</h2>
          <div className="grid grid-cols-3 p-4 border border-gray-100 rounded-lg divide-x-2 text-sm bg-white">
            <div className="flex flex-col items-center justify-between   space-y-2 text-center">
              <h2 className="text-green-500 text-center text-sm">Present</h2>
              <p className="text-textc1-700 text-center text-lg">20 Days</p>
            </div>
            <div className="flex flex-col items-center justify-between  space-y-2 text-center">
              <h2 className="text-red-500 text-center text-sm">Absent</h2>
              <p className="text-textc1-700 text-center text-lg ">02 Days</p>
            </div>
            <div className="flex flex-col items-center justify-between text-lg space-y-2 text-center">
              <h2 className="text-yellow-500 text-center text-sm">Late</h2>
              <p className="text-textc1-700 text-center text-lg ">02 Days</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className=" bg-white rounded-lg lg:rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-700">August 2025</h3>
            <Calendar size={18} />
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {calendarDays.flat().map((day, i) => (
              <div
                key={i}
                className={`w-8 h-8 flex items-center justify-center text-sm rounded-full
                ${
                  day === 14
                    ? "bg-orange-400 text-white"
                    : day === 7
                      ? "bg-red-500 text-white"
                      : day === 13
                        ? "bg-green-500 text-white"
                        : " text-gray-600"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
