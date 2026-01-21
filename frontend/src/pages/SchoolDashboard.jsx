import { Link, useParams } from "react-router-dom";
import { useSchool } from "../contexts/SchoolContext";
import { useEffect, useState } from "react";
import { Flag, MoveRight, Users2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useStudent } from "../contexts/studentContext";
import { useClass } from "../contexts/classContext";
const SchoolDashboard = () => {
  const { id } = useParams();
  const { fetchSchoolById, schoolById } = useSchool();
  const { fetchStudentBySchool, studentsBySchool } = useStudent();
  const { fetchTeachersBySchool, teachers } = useAuth();
  const { fetchClassesBySchool, classesBySchool } = useClass();
  console.log(classesBySchool);
  useEffect(() => {
    if (!id) return;
    fetchSchoolById(id);
  }, [id]);

  useEffect(() => {
    if (!schoolById) return;
    fetchTeachersBySchool(schoolById["data"]?.school);
  }, [schoolById]);

  useEffect(() => {
    if (!schoolById) return;
    fetchStudentBySchool(schoolById["data"]?.school);
  }, [schoolById]);

  useEffect(() => {
    if (!schoolById) return;
    fetchClassesBySchool(schoolById["data"]?.school);
  }, [schoolById]);

  return (
    <div className="flex flex-col space-y-4 bg-white min-h-screen rounded-2xl font-lexend">
      <div className="flex flex-row items-center justify-between px-4 py-8 border-b border-gray-100">
        <h2 className="text-[24px]">{schoolById["data"]?.school}</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="p-2 lg:p-4 lg:border rounded-[12px] lg:rounded-2xl space-y-2 lg:space-y-4 ">
          <div className="flex items-center flex-row justify-between text-sm lg:text-base">
            <span className="font-medium text-gray-800 text-[17px]">
              Average performance
            </span>

            <span className="flex items-center gap-2 text-[#81ecec] font-medium text-sm lg:text-base bg-[#81ecec]/20 p-3 rounded-full">
              <Users2 />
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "34%",
                background: "linear-gradient(90deg, #22c55e, #facc15, #fb7185)",
              }}
            />
          </div>

          {/* Percent */}
          <div className="flex justify-between text-xs">
            <span className="text-red-500 font-medium text-[17px]">34%</span>
            <span className="text-purple-500 font-medium text-[17px]">
              100%
            </span>
          </div>
        </div>
        <div className="p-2 lg:p-4 lg:border rounded-[12px] lg:rounded-2xl space-y-2 lg:space-y-4 ">
          <div className="flex items-center flex-row justify-between text-sm lg:text-base">
            <span className="font-medium text-gray-800 text-[17px]">
              Today Present
            </span>

            <span className="flex items-center gap-2 text-primary-700 font-medium text-sm lg:text-base text-[17px] p-3">
              186
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full text-[17px]"
              style={{
                width: "70%",
                background: "linear-gradient(90deg, #22c55e, #facc15, #fb7185)",
              }}
            />
          </div>

          {/* Percent */}
          <div className="flex justify-between text-xs">
            <span className="text-green-500 font-medium text-[17px]">Good</span>
            <div className="bg-green-500 font-medium w-4 h-4 rounded-full"></div>
          </div>
        </div>
        <Card
          lable="total student"
          value={studentsBySchool.length}
          Icon={MoveRight}
          to="student"
        />
        <Card
          lable="total teacher"
          value={teachers?.length}
          Icon={MoveRight}
          to="teacher"
        />
        <Card
          lable="total class"
          value={classesBySchool.length}
          Icon={MoveRight}
          to="teacher"
        />
        <Card lable="updated Homework" value="10" Icon={MoveRight} />
        <Card lable="published announcements" value="10" Icon={MoveRight} />
        <Card lable="total like from this school" value="10" Icon={MoveRight} />
        <Card lable="total block students" value="10" Icon={MoveRight} />
        <Card lable="total restricted students" value="10" Icon={MoveRight} />
      </div>
    </div>
  );
};

export default SchoolDashboard;

const Card = ({ lable, value, Icon, to }) => (
  <div className="p-2 lg:p-4 lg:border rounded-[12px] lg:rounded-2xl space-y-2 lg:space-y-4 ">
    <h2 className="text-[24px] capitalize">{lable}</h2>
    <div className="flex flex-row items-center justify-between">
      <p className="text-[54px]">{value}</p>
      <Link
        to={to}
        className="flex items-center gap-2  font-medium text-sm lg:text-base  p-3 rounded-lg border border-gray-100 text-textc2-700"
      >
        <Icon />
      </Link>
    </div>
  </div>
);
