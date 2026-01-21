const AttendanceHeader = ({ date, setDate }) => {
  return (
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border px-4 py-2 rounded-lg"
    />
  );
};

export default AttendanceHeader;
