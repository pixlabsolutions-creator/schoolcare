const cloudinary = require("../config/cloudinary");
const News = require("../models/news.model");
const Notification = require("../models/notification.model");
const NotificationRead = require("../models/notificationRead.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");

const createNews = async (req, res) => {
  try {
    const { title, descriptions, school } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!title || !descriptions || !school) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "news" },
    );

    const newNews = await News.create({
      image: result.secure_url,
      title,
      descriptions,
      school,
      public_id: result.public_id,
    });

    res.status(201).json({
      success: true,
      data: newNews,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// =====================Get News By School=================

const getNewsBySchool = async (req, res) => {
  try {
    const { school } = req.params;
    const news = await News.find({ school });
    if (!news) {
      return res.status(401).json({ message: "News Not Found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.find({ _id: id });

    if (!news) {
      return res.status(401).json({ message: "News Not Found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { createNews, getNewsBySchool, getNewsById };
