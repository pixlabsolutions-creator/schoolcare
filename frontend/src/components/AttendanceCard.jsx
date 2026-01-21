const AttendanceCard = ({ item, attendance, setAttendance }) => {
  const setStatus = (status) => {
    setAttendance((prev) =>
      prev.map((s) =>
        s.student._id === item.student._id ? { ...s, status } : s
      )
    );
  };

  return (
    <div className="grid grid-cols-2 p-3 border-b">
      <div>
        <p className="font-medium">{item.student.studentId}</p>
        <p>{item.student.name}</p>
      </div>

      <div className="flex justify-evenly">
        <button
          onClick={() => setStatus("present")}
          className={`w-8 h-8 rounded-full border ${
            item.status === "present" ? "bg-purple-600" : ""
          }`}
        />
        <button
          onClick={() => setStatus("late")}
          className={`w-8 h-8 rounded-full border ${
            item.status === "late" ? "bg-yellow-400" : ""
          }`}
        />
        <button
          onClick={() => setStatus("absent")}
          className={`w-8 h-8 rounded-full border ${
            item.status === "absent" ? "bg-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default AttendanceCard;
