import { Link, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import CalendarHeader from "../components/CalendarHeader";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStudent } from "../contexts/studentContext";
import { useAttendance } from "../contexts/AttendanceContext";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

const ClassWiseAttendance = () => {
  const { name } = useParams();
  const { user } = useAuth();
  const { createAttendance, attendanceRecords, fetchAttendance } =
    useAttendance();
  const { fetchClassWiseStudent, classStudents, loading } = useStudent();

  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    school: "",
    classId: "",
    date: "",
    students: [],
  });

  const formatDateForAPI = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const formatDateForDisplay = (date) => {
    return format(date, "dd MMM yyyy");
  };

  const findAttendanceForDate = () => {
    if (!attendanceRecords || attendanceRecords.length === 0) return null;

    const formattedSelectedDate = formatDateForAPI(selectedDate);

    return attendanceRecords.find((record) => {
      try {
        let recordDate;
        if (record.date instanceof Date) {
          recordDate = format(record.date, "yyyy-MM-dd");
        } else if (typeof record.date === "string") {
          recordDate = format(new Date(record.date), "yyyy-MM-dd");
        } else {
          return false;
        }
        return recordDate === formattedSelectedDate;
      } catch (error) {
        console.error("Error parsing date:", error);
        return false;
      }
    });
  };

  const currentAttendanceRecord = findAttendanceForDate();

  useEffect(() => {
    if (!user?.school || !name) {
      return;
    }

    fetchClassWiseStudent(name, user?.school);

    const formattedDate = formatDateForAPI(selectedDate);
    fetchAttendance(user?.school, name, formattedDate);
  }, [name, user?.school, selectedDate]);

  useEffect(() => {
    if (classStudents.length === 0) return;

    if (currentAttendanceRecord) {
      const existingData = {};
      currentAttendanceRecord.students.forEach((student) => {
        existingData[student.student] = student.status;
      });
      setAttendanceData(existingData);
      setIsEditMode(false);
    } else {
      const initialAttendanceData = {};
      classStudents.forEach((student) => {
        initialAttendanceData[student._id] = "present";
      });
      setAttendanceData(initialAttendanceData);
      setIsEditMode(true);
    }
  }, [classStudents, currentAttendanceRecord]);

  useEffect(() => {
    if (!user?.school || !name || classStudents.length === 0) {
      return;
    }

    const formattedDate = formatDateForAPI(selectedDate);
    const studentsAtt = classStudents.map((student) => ({
      student: student._id,
      status: attendanceData[student._id] || "present",
    }));

    setFormData({
      school: user?.school,
      teacher: user?.username,
      classId: name,
      date: formattedDate,
      students: studentsAtt,
    });
  }, [user, name, selectedDate, classStudents, attendanceData]);

  const handleSubmit = async () => {
    try {
      const submissionData = {
        ...formData,
        date: formatDateForAPI(selectedDate),
      };

      console.log("Submitting attendance:", submissionData);

      await createAttendance(submissionData);

      const formattedDate = formatDateForAPI(selectedDate);
      fetchAttendance(user?.school, name, formattedDate);
    } catch (err) {
      console.error("Error saving attendance:", err);
      toast.error("Error saving attendance");
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    if (currentAttendanceRecord) {
      const existingData = {};
      currentAttendanceRecord.students.forEach((student) => {
        existingData[student.student] = student.status;
      });
      setAttendanceData(existingData);
    }
    setIsEditMode(false);
  };

  return (
    <div className="lg:bg-white/90 flex flex-col lg:space-y-4 min-h-screen rounded-2xl">
      {/* ===== Header ===== */}
      <Header
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        currentAttendanceRecord={currentAttendanceRecord}
        onEditClick={handleEditClick}
        onCancelEdit={handleCancelEdit}
      />

      {/* ===== Date Selector ===== */}
      <div className="lg:p-4">
        <CalendarHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      {currentAttendanceRecord && (
        <div className="text-[13px] text-justify bg-white border border-primary-700 lg:m-4 my-2 p-2 rounded-lg">
          <h2>
            You have already published this attendance. You cannot publish it
            again, and editing is not allowed.
          </h2>
        </div>
      )}
      {/* ===== Attendance List ===== */}
      <div className="lg:p-4 flex flex-col gap-4 pb-4">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading...</p>
        ) : classStudents.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No students found
          </p>
        ) : (
          <div className="lg:border lg:border-gray-100  lg:rounded-2xl text-xl space-y-4 lg:space-y-0">
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 p-4 border-b border-blue-100 text-[24px] font-semibold">
              <div className="col-span-1 grid grid-cols-3 item-center space-x-2 lg:space-x-4 ">
                <h2 className="col-span-1">Student ID</h2>
                <h2 className="col-span-1">Name</h2>
              </div>
              <div className="flex items-center justify-evenly">
                <h2>Present</h2>
                <h2>Late</h2>
                <h2>Absent</h2>
              </div>
            </div>

            {classStudents.map((item) => (
              <AttendanceCard
                key={item._id}
                studentId={item._id}
                studentRoll={item.studentId}
                name={item.name}
                attendanceData={attendanceData}
                setAttendanceData={setAttendanceData}
                isEditMode={isEditMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== Footer Buttons (Mobile) ===== */}
      <div className="flex lg:hidden px-4 pb-4 gap-3">
        {isEditMode ? (
          <>
            <button
              onClick={handleSubmit}
              className=" flex-1 flex items-center justify-center px-8 py-3 rounded-[10px] bg-[#9542e7] text-white hover:bg-[#8338c9] transition-colors"
            >
              Publish
            </button>
            {currentAttendanceRecord && (
              <button
                onClick={handleCancelEdit}
                className="px-6 py-3 rounded-[10px] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </>
        ) : !currentAttendanceRecord ? (
          <button className=" flex-1 flex items-center justify-center px-8 py-3 rounded-[10px] bg-white text-amber-500 border border-amber-500 hover:bg-amber-600 transition-colors">
            Submitted
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ClassWiseAttendance;

/* ===== Helper Components ===== */
const Header = ({
  handleSubmit,
  isEditMode,
  currentAttendanceRecord,
  onCancelEdit,
}) => (
  <div className="flex flex-row items-center justify-between lg:bg-white lg:px-4 py-4 lg:py-8 rounded-t-2xl lg:border-b lg:border-gray-200">
    <div className="flex flex-row items-center space-x-2">
      <Link to="/teacher/classes">
        <MoveLeft className="" />
      </Link>
      <h1 className="text-lg font-semibold text-gray-800">Attendance</h1>
    </div>
    <div className="hidden lg:flex items-center gap-3">
      {isEditMode ? (
        <>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center space-x-2 px-8 py-3 rounded-[10px] bg-[#9542e7] text-white hover:bg-[#8338c9] transition-colors"
          >
            Publish
          </button>
          {currentAttendanceRecord && (
            <button
              onClick={onCancelEdit}
              className="px-6 py-3 rounded-[10px] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </>
      ) : null}
    </div>
  </div>
);

const AttendanceCard = ({
  studentId,
  studentRoll,
  name,
  attendanceData,
  setAttendanceData,
  isEditMode,
}) => {
  const status = attendanceData[studentId] || "present";

  const handleClick = (newStatus) => {
    if (!isEditMode) return;

    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: newStatus,
    }));
  };

  const getButtonClass = (buttonStatus) => {
    const baseClass =
      "p-[8px] lg:p-[12px] rounded-full border-2 transition-colors";
    const activeClass = {
      present: "border-[#9542E7] bg-[#9542E7]",
      late: "border-[#FBBF24] bg-[#FBBF24]",
      absent: "border-[#FF4B4B] bg-[#FF4B4B]",
    };
    const inactiveClass = "border-[#BFBFBF] bg-white";
    const disabledClass = !isEditMode
      ? "opacity-70 cursor-default"
      : "hover:border-gray-400";

    if (status === buttonStatus) {
      return `${baseClass} ${activeClass[buttonStatus]} ${disabledClass}`;
    }
    return `${baseClass} ${inactiveClass} ${disabledClass}`;
  };

  return (
    <div className="grid grid-cols-1 bg-white lg:grid-cols-2 p-3 text-textc1-700 hover:bg-gray-50 transition-colors  space-y-2 lg:space-y-0 rounded-[12px]">
      <div className="col-span-1 flex flex-row items-center justify-between lg:grid grid-cols-3 item-center space-x-2 lg:space-x-4 ">
        <h2 className="col-span-1 font-medium order-2 lg:order-1 text-[14px] lg:text-2xl">
          <span className="lg:hidden">ID:</span> {studentRoll}
        </h2>
        <h2 className="col-span-1 font-medium order-1 lg:order-2 text-[14px] lg:text-2xl">
          {name}
        </h2>
      </div>
      <div className="flex items-center justify-between lg:justify-evenly">
        <div className="flex flex-row items-center space-x-2">
          <button
            className={getButtonClass("present")}
            onClick={() => handleClick("present")}
            title={!isEditMode ? "Read-only mode" : "Present"}
            disabled={!isEditMode}
          />
          <span className="text-[14px] lg:hidden">Present</span>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button
            className={getButtonClass("late")}
            onClick={() => handleClick("late")}
            title={!isEditMode ? "Read-only mode" : "Late"}
            disabled={!isEditMode}
          />
          <span className="text-[14px] lg:hidden">Late</span>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button
            className={getButtonClass("absent")}
            onClick={() => handleClick("absent")}
            title={!isEditMode ? "Read-only mode" : "Absent"}
            disabled={!isEditMode}
          />
          <span className="text-[14px] lg:hidden">Absent</span>
        </div>
      </div>
    </div>
  );
};
