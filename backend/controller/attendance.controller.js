const Attendance = require("../models/attendance.model");

// POST: Create Attendance
exports.createAttendance = async (req, res) => {
  try {
    const { school, classId, date, students, teacher } = req.body;

    // validation
    if (
      !school ||
      !classId ||
      !date ||
      !students ||
      students.length === 0 ||
      !teacher
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Model অনুযায়ী validation - field নাম "student"
    const hasInvalidStudent = students.some(
      (studentItem) => !studentItem.student || !studentItem.status
    );

    if (hasInvalidStudent) {
      return res.status(400).json({
        success: false,
        message: "Each student must have a valid student ID and status",
      });
    }

    // check if attendance already exists for this class & date
    const existingAttendance = await Attendance.findOne({
      classId,
      date: new Date(date),
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance already taken for this class & date",
      });
    }

    const attendance = new Attendance({
      school,
      classId,
      date,
      students,
      teacher,
    });

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      attendance,
    });
  } catch (error) {
    console.error("Attendance Error:", error);

    // Better error handling
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry found. Please check student IDs.",
        error: error.message,
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get: Attendance

exports.getAttendance = async (req, res) => {
  try {
    let { school } = req.params;
    school = school?.trim();
    const { classId, date } = req.query;

    if (!school || !classId || !date) {
      return res.status(401).json({ message: "All Fields are required" });
    }
    const attendance = await Attendance.find({ school, classId, date });
    if (!attendance) {
      return res.status(401).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: "Server Problem" });
  }
};
