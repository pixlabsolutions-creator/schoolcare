const Notification = require("../models/notification.model");

const getAllNotifications = async (req, res) => {
  try {
    const school = req.user.school;
    const getNotifications = await Notification.find({ school });
    if (!getNotifications) {
      res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(getNotifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllNotifications };
