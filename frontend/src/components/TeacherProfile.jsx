import {
  ArrowLeft,
  Bell,
  Wallet,
  Info,
  LogOut,
  MoveLeft,
  Camera,
  Ticket,
  BookOpen,
  MessageCircleMore,
  Megaphone,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

import ProfileIcon from "../assets/profileshadow.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Icon from "../assets/icon.png";
import { Link } from "react-router-dom";
import { useClass } from "../contexts/classContext";
import { useSchool } from "../contexts/SchoolContext";
import { useStudent } from "../contexts/studentContext";
import { useAnouncement } from "../contexts/AnoucementContext";
import ProfileImageModal from "./ProfileImageModal";

const TeacherProfile = () => {
  const { user, logout, fetchTeachersBySchool, teachers } = useAuth();
  const { fetchClassesBySchool, classesBySchool } = useClass();
  const { schools } = useSchool();
  const { fetchStudentBySchool, studentsBySchool } = useStudent();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(user?.image);
  const { anouncements } = useAnouncement();
  useEffect(() => {
    if (!user?.school) return;
    fetchClassesBySchool(user?.school);
  }, [user?.school]);

  useEffect(() => {
    if (!user?.school) return;
    fetchTeachersBySchool(user?.school);
  }, [user?.school]);

  useEffect(() => {
    if (!user?.school) return;
    fetchStudentBySchool(user?.school);
  }, [user?.school]);

  const findSchool = schools?.filter(
    (school) => user?.school === school?.school,
  );

  return (
    <div className="space-y-4 lg:space-y-20 lg:bg-white rounded-2xl pb-20 min-h-screen">
      {/* ===== Header ===== */}
      <div className="flex items-center lg:p-8 space-x-4  lg:border-b ">
        <MoveLeft className="text-gray-600 size-5" />
        <h1 className="text-[14px] lg:text-2xl font-semibold">Profile</h1>
      </div>

      {/* ===== Main Card ===== */}
      <div className="lg:w-2/3 lg:shadow-lg lg:mx-auto  lg:flex lg:flex-col lg:items-center lg:justify-center lg:bg-white rounded-2xl lg:border border-gray-100 lg:p-10 space-y-4">
        <div className="w-full grid grid-cols-1 gap-4 capitalize ">
          {/* ===== Teacher Info ===== */}
          <div className="lg:hidden rounded-lg lg:rounded-2xl p-2 lg:p-4 space-y-2 bg-white">
            <div className="flex flex-row items-center justify-between border border-gray-100 p-3 rounded-md lg:rounded-lg relative">
              <div className="flex items-center gap-3 ">
                <div className="w-[53px] h-[53px] rounded-full bg-gradient-to-tl from-violet-800 to-purple-400 text-white flex items-center justify-center font-semibold relative">
                  {user?.image ? (
                    <img
                      src={user.image}
                      className="rounded-full"
                      alt="Image"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white bg-linear-to-tr from-primary-700 to-purple-600 rounded-full">
                      {user?.username?.slice(0, 1)}
                    </div>
                  )}

                  <button
                    className="bg-white text-primary-700 p-1 rounded-full absolute bottom-0 right-0"
                    onClick={() => setOpen(true)}
                  >
                    <Camera size={10} />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-[17px]">{user?.username}</p>
                  <p className="text-xs text-gray-400 text-[12px]">
                    Teacher ID: {user?.userId}
                  </p>
                </div>
              </div>
              <div className="hidden lg:absolute bottom-0 right-0 max-w-20">
                <img src={user.image || null} alt="" />
              </div>
            </div>
          </div>

          <div className="hidden  lg:flex flex-row items-center justify-center">
            <div className="relative w-[95px] h-[95px]">
              <img
                src={user.image || null}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />

              <Camera
                onClick={() => setOpen(true)}
                size={26}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow"
              />
            </div>
          </div>

          <div className="lg:grid grid-cols-2 lg:space-y-0 lg:gap-4 lg:w-full bg-white rounded-lg lg:rounded-2xl p-2 lg:p-4 space-y-2 ">
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]   px-1">
                School Name
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {user?.school}
              </p>
            </fieldset>

            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]  px-1">
                Total Class
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {classesBySchool?.length}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]  px-1">
                Joined on
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {new Date(user?.joinOn).toLocaleDateString()}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px] px-1">
                Contact Number
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {user?.phone}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]  px-1">
                Total Teacher
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {teachers?.length}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]  px-1">
                Total Students
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {studentsBySchool?.length}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]  px-1">
                Head Master Name
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {findSchool[0]?.headMasterName}
              </p>
            </fieldset>
            <fieldset className="fieldset border border-gray-100 rounded-box w-xs  min-h-[56px] px-3 pt-1 pb-2 rounded-md">
              <legend className="fieldset-legend text-textc2-700 text-[14px] lg:text-[18px]  px-1">
                School ID
              </legend>
              <p className="label text-textc1-700 text-[12px] lg:text-[20px]">
                {findSchool[0]?.schoolId}
              </p>
            </fieldset>
          </div>

          {/* ===== Right Menu ===== */}
          <div className="lg:hidden grid grid-cols-1 bg-white rounded-lg lg:rounded-xl p-2 lg:p-4">
            <div className="col-span-1  flex-col items-center justify-between space-y-2 ">
              <div className="flex flex-col items-center justify-start space-y-2 ">
                <Link
                  to="/teacher/admission"
                  className="flex lg:hidden w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <Ticket size={20} />
                  <span className="text-[14px] text-textc1-700">Admission</span>
                </Link>
                <Link
                  to="/teacher/results"
                  className="flex lg:hidden w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <BookOpen size={20} />
                  <span className="text-[14px] text-textc1-700">Results</span>
                </Link>
                <Link
                  to="/teacher/finance"
                  className="flex lg:hidden w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <Wallet size={20} />
                  <span className="text-[14px] text-textc1-700">Finance</span>
                </Link>
                <Link
                  to="/teacher/chat"
                  className="flex lg:hidden w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <MessageCircleMore size={20} />
                  <span className="text-[14px] text-textc1-700">
                    Chat With Students
                  </span>
                </Link>
                <Link
                  to={`${anouncements?.length <= 0 ? "/teacher/announcement/form" : "/teacher/announcement"}`}
                  className="flex lg:hidden w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <Megaphone size={20} />
                  <span className="text-[14px] text-textc1-700">
                    Important Notice
                  </span>
                </Link>
                <Link
                  to="/teacher/about"
                  className="flex lg:hidden  w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <Info size={20} />
                  <span className="text-[14px] text-textc1-700">About Us</span>
                </Link>
                <Link
                  to="/teacher/terms"
                  className="flex lg:hidden  w-full items-center gap-2 p-4 border border-gray-100 rounded-lg text-textc2-700"
                >
                  <Info size={20} />
                  <span className="text-[14px] text-textc1-700">
                    Terms & Conditions
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-row space-x-2 p-4 bg-white border border-gray-100 rounded-lg">
          <button
            className="flex text-primary-700 flex-row items-center justify-between space-x-2 text-[14px]"
            onClick={() => logout()}
          >
            <LogOut /> <h2>Log out</h2>
          </button>
        </div>
        <button className=" flex flex-row items-center space-x-2 justify-center lg:hidden  w-full py-3 bg-primary-700 text-white capitalize rounded-lg text-xl font-lexend">
          <IoChatbubbleEllipsesOutline />
          <h2 className="text-[14px]">contact with Support Team</h2>
        </button>
        <div className="w-3/5">
          <ProfileImageModal
            isOpen={open}
            onClose={() => setOpen(false)}
            userId={user._id}
            currentImage={avatar}
            onUpdated={(img) => setAvatar(img)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
