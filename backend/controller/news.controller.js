const cloudinary = require("../config/cloudinary");
const News = require("../models/news.model");

const createNews = async (req, res) => {
  try {
    const { title, descriptions } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!title || !descriptions) {
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

// =====================Get All News =================

const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    if (!news) {
      return res.status(401).json({ message: "News Not Found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send("Internal Server Error");
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

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // 2. Delete image from Cloudinary
    if (news.public_id) {
      await cloudinary.uploader.destroy(news.public_id);
    }

    // 3. Delete news from MongoDB
    await News.findByIdAndDelete(id);

    // 4. Send response
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete News Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createNews,
  getNewsBySchool,
  getNewsById,
  getAllNews,
  deleteNews,
};
