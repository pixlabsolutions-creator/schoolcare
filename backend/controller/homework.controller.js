const cloudinary = require("../config/cloudinary");
const Homework = require("../models/homework.model");
const Notification = require("../models/notification.model");
const NotificationRead = require("../models/notificationRead.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");

const createHomeWork = async (req, res) => {
  try {
    const { subject, details, teacher, className, school } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!subject || !details || !teacher || !className || !school) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "homework" },
    );

    const homework = await Homework.create({
      image: result.secure_url,
      subject,
      details,
      teacher,
      className,
      school,
    });

    // 🔔 create notification
    const notification = await Notification.create({
      school,
      title: "New Homework",
      message: `Homework added for class ${className} in ${subject}`,
      type: "homework",
    });

    // 👥 get all users of this school
    const teachers = await User.find({ school });
    const students = await Student.find({ school });

    const users = [...teachers, ...students];

    // 📌 create read records for ALL users
    const readDocs = users.map((user) => ({
      notification: notification._id,
      user: user._id,
      isRead: false,
    }));

    await NotificationRead.insertMany(readDocs);

    global.io.to(school).emit("new-notification", notification);

    res.status(201).json(homework);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllHomework = async (req, res) => {
  try {
    const homework = await Homework.find();
    res.status(200).json(homework);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getHomeworkByClass = async (req, res) => {
  try {
    const { className } = req.params;
    const { teacher } = req.query;
    const homework = await Homework.find({ className, teacher });
    if (!homework) {
      return res.status(401).json({ message: "Home Work Not Found" });
    }
    res.status(200).json(homework);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getHomeworkByClassForStudents = async (req, res) => {
  try {
    const { className } = req.params;

    let { school } = req.query;

    school = school?.trim();

    const homework = await Homework.find({ className, school });
    if (!homework) {
      return res.status(401).json({ message: "Home Work Not Found" });
    }
    res.status(200).json(homework);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getHomeworkById = async (req, res) => {
  try {
    const { id } = req.params;

    const homework = await Homework.find({ _id: id });
    if (!homework) {
      return res.status(401).json({ message: "Home Work Not Found" });
    }
    res.status(200).json(homework);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ======================Update Like ================================

const updateHomeworkLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const homework = await Homework.findById(id);

    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }

    const index = homework.like.likerId.indexOf(userId);

    if (index === -1) {
      // Like
      homework.like.likerId.push(userId);
      await homework.save();
      return res.status(200).json({ message: "Liked" });
    } else {
      // Unlike
      homework.like.likerId.splice(index, 1);
      await homework.save();
      return res.status(200).json({ message: "Unliked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createHomeWork,
  getAllHomework,
  getHomeworkByClass,
  getHomeworkById,
  getHomeworkByClassForStudents,
  updateHomeworkLikeById,
};
