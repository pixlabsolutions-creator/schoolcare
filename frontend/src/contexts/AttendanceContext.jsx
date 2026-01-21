import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const createAttendance = async (submissionData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/attendance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Attendance saved successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving attendance");
    }
  };

  const fetchAttendance = async (school, classId, date) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/attendance/${encodeURIComponent(
          school
        )}?classId=${classId}&date=${date}`
      );
      if (!res.ok) throw new Error("Some Thing wrong");
      const data = await res.json();
      setAttendanceRecords(data);
    } catch (err) {
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{ createAttendance, loading, fetchAttendance, attendanceRecords }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
