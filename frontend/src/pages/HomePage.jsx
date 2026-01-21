import { Calendar, BookOpen, Newspaper } from "lucide-react";

const HomePage = () => {
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
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Average Performance */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800">
            Average performance
          </h3>

          {/* Today | Present */}
          <div className="flex items-center justify-between border rounded-2xl px-4 py-3">
            <span className="text-gray-700 font-medium">Today</span>

            <span className="w-px h-5 bg-gray-300"></span>

            <span className="flex items-center gap-2 font-medium text-gray-700">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Present
            </span>
          </div>

          {/* Present | Absent | Late */}
          <div className="flex justify-between items-center border rounded-2xl px-4 py-4 text-sm">
            <div className="flex flex-col items-center flex-1">
              <span className="text-green-600 font-medium">Present</span>
              <span className="text-gray-800 mt-1">20 Days</span>
            </div>

            <span className="w-px h-8 bg-gray-300"></span>

            <div className="flex flex-col items-center flex-1">
              <span className="text-red-500 font-medium">Absent</span>
              <span className="text-gray-800 mt-1">02 Days</span>
            </div>

            <span className="w-px h-8 bg-gray-300"></span>

            <div className="flex flex-col items-center flex-1">
              <span className="text-yellow-500 font-medium">Late</span>
              <span className="text-gray-800 mt-1">02 Days</span>
            </div>
          </div>

          {/* Average Performance Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-800">
                Average performance
              </span>

              <span className="flex items-center gap-2 text-red-500 font-medium">
                <span className="text-purple-500 tracking-widest">
                  ············→
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

        {/* Monthly Status */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800">This Month</h3>

          {/* ===== Present ===== */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-yellow-400 rounded-full" />
            </div>

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

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
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
                    ? "bg-[#6C5DD3] text-white"
                    : "text-gray-600 hover:bg-[#F1EDFF]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Homework */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-semibold">Homework today</h3>

            <span className="text-xs text-[#6C5DD3]">See All</span>
          </div>

          {["Bangla", "English", "General Science"].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
            >
              <BookOpen size={18} className="text-[#6C5DD3]" />
              <div>
                <p className="text-sm font-medium">{s}</p>
                <p className="text-xs text-gray-400">
                  Teacher: Hanif · 30 Oct 2025
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-semibold">Important Notice</h3>
            <span className="text-xs text-[#6C5DD3]">See All</span>
          </div>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
            >
              <Newspaper size={18} className="text-yellow-500" />
              <p className="text-sm text-gray-600">
                School will remain closed on Friday
              </p>
            </div>
          ))}
        </div>

        {/* Popular News */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-semibold">Popular News</h3>
            <span className="text-xs text-[#6C5DD3]">See All</span>
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50">
              <img
                src="https://i.pravatar.cc/60"
                className="w-12 h-12 rounded-lg"
              />
              <p className="text-sm text-gray-600">
                Education board announced new policy
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
