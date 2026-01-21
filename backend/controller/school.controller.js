const cloudinary = require("../config/cloudinary");
const School = require("../models/school.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const Attendance = require("../models/attendance.model");
const Classes = require("../models/classes.model");
const Homework = require("../models/homework.model");
const Notification = require("../models/notification.model");
const Anouncement = require("../models/anouncement.model");

const getNextSchoolId = async () => {
  const lastSchool = await School.findOne().sort({ schoolId: -1 }).exec();

  let nextId;

  if (!lastSchool || !lastSchool.schoolId) {
    nextId = "2312";
  } else {
    const idNum = Number(lastSchool.schoolId);
    nextId = String(idNum + 1).padStart(4, "0");
  }

  return nextId;
};

exports.createSchool = async (req, res) => {
  try {
    const { school, address, joinedOn, headMasterName, phone } = req.body;
    const existingSchool = await School.findOne({ school });
    if (existingSchool) {
      return res.status(400).json({
        success: false,
        message: "School already exists",
      });
    }

    const newSchoolId = await getNextSchoolId();

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "school" },
    );

    const newSchool = await School.create({
      schoolId: newSchoolId,
      image: result.secure_url,
      school,
      address,
      joinedOn,
      headMasterName,
      phone,
    });

    res.status(201).json({
      success: true,
      data: newSchool,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ school: 1 });

    res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const updatedSchool = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedSchool) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedSchool,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    await User.deleteMany({ school: school.school });
    await Student.deleteMany({ school: school.school });
    await Classes.deleteMany({ school: school.school });
    await Homework.deleteMany({ school: school.school });
    await Anouncement.deleteMany({ school: school.school });
    await Attendance.deleteMany({ school: school.school });
    await Notification.deleteMany({ school: school.school });

    await school.deleteOne();

    res.status(200).json({
      success: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
