const Anouncement = require("../models/anouncement.model");

const createAnouncement = async (req, res) => {
  try {
    const { title, descriptions, teacher, school } = req.body;

    if (!title || !descriptions || !teacher || !school) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const anouncement = await Anouncement.create({
      title,
      descriptions,
      teacher,
      school,
    });

    res.status(201).json(anouncement);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAnnouncemant = async (req, res) => {
  try {
    let { school } = req.query;

    school = school?.trim();

    const announcemant = await Anouncement.find();
    if (!announcemant) {
      return res.status(401).json({ message: " No anouncemant Found yet" });
    }
    res.status(200).json(announcemant);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAnnouncemant = async (req, res) => {
  try {
    let { school } = req.query;

    school = school?.trim();

    const announcemant = await Anouncement.find({ school });
    if (!announcemant) {
      return res.status(401).json({ message: " No anouncemant Found yet" });
    }
    res.status(200).json(announcemant);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const getAnnouncemantById = async (req, res) => {
  try {
    let { id } = req.params;
    const announcemant = await Anouncement.findOne({ _id: id });
    if (!announcemant) {
      return res.status(401).json({ message: " No anouncemant Found yet" });
    }

    res.status(200).json(announcemant);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const deleteAnnouncemantById = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const announcemant = await Anouncement.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Announcement Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateAnnouncementLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const announcemant = await Anouncement.findById(id);

    if (!announcemant) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    const index = announcemant.like.likerId.indexOf(userId);

    if (index === -1) {
      announcemant.like.likerId.push(userId);
      await announcemant.save();
      return res.status(200).json({ message: "Liked" });
    } else {
      announcemant.like.likerId.splice(index, 1);
      await announcemant.save();
      return res.status(200).json({ message: "Unliked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createAnouncement,
  getAnnouncemant,
  getAnnouncemantById,
  deleteAnnouncemantById,
  updateAnnouncementLikeById,
  getAllAnnouncemant,
};
