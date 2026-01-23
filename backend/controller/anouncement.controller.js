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

module.exports = { createAnouncement, getAnnouncemant, getAnnouncemantById };
