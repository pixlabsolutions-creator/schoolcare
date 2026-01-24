const cloudinary = require("../config/cloudinary");
const Student = require("../models/student.model");

const BlackListToken = require("../models/blackListTokenModel");

const getNextStudentId = async () => {
  const lastStudent = await Student.findOne().sort({ studentId: -1 }).exec();

  let nextId;

  if (!lastStudent || !lastStudent.studentId) {
    nextId = "263815";
  } else {
    const idNum = Number(lastStudent.studentId);
    nextId = String(idNum + 1);
  }

  return nextId;
};

const createStudent = async (req, res) => {
  try {
    const { name, fathername, classId, password, phone, school, teacher, dob } =
      req.body;
    if (!name || !fathername || !classId || !password || !school || !teacher) {
      return res.status(400).send("Missing required fields");
    }
    const newStudentId = await getNextStudentId();
    const isExistingUser = await Student.findOne({ studentId: newStudentId });

    if (isExistingUser) {
      return res.status(409).send("Username already exists");
    }

    const lastStudent = await Student.findOne({ school, classId })
      .sort({ roll: -1 })
      .exec();

    const nextRoll =
      lastStudent && lastStudent.roll ? Number(lastStudent.roll) + 1 : 1;

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "student" },
    );

    const newStudent = new Student({
      image: result ? result.secure_url : "",
      studentId: newStudentId,
      name,
      fathername,
      roll: nextRoll,
      classId,
      password,
      phone,
      school,
      teacher,
      dob,
    });

    const student = await newStudent.save();

    const token = student.generateAuthToken();

    res.status(201).json({ student, token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

// ===========Get All Students ===========

const getAllstudent = async (req, res) => {
  try {
    let { school } = req.query;

    school = school?.trim();

    const student = await Student.find({ school }).select("-password");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
// ==========Get Students For Admin===========
const getAllstudentForAdmin = async (req, res) => {
  try {
    const student = await Student.find();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ===========Get Students by Class ===========

const getStudentByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const { school } = req.query;

    const student = await Student.find({ classId, school }).select("-password");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ===========Login Student ===========

const loginStudent = async (req, res) => {
  try {
    const { studentId, password, userRole } = req.body;

    const user = await Student.findOne({ studentId });

    if (!user) {
      return res.status(404).send("Student not found");
    }
    const isMatchRole = user.userRole === userRole;
    if (!isMatchRole) {
      return res.status(401).send("Invalid User");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ===========Delete Student ===========

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.status(200).json({
      success: true,
      message: "Student successfully Delete",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ===========Profile Student ===========

const studentProfile = (req, res, next) => {
  res.status(201).json(req.user);
};

// ===========Logout Student ===========

const logoutStudent = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlackListToken.create({ token });
  res.status(200).json({ message: "Logout" });
};

const studentBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    const student = await Student.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllstudent,
  loginStudent,
  deleteStudent,
  logoutStudent,
  studentProfile,
  getStudentByClass,
  studentBlock,
  getAllstudentForAdmin,
};
