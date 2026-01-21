const NotificationRead = require("../models/notificationRead.model");
const Notification = require("../models/notification.model");

// Get all notification read status for current user
const getAllNotificationsRead = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    const notificationsRead = await NotificationRead.find({
      user: userId,
    }).populate("notification"); // optional: populate notification details

    res.json(notificationsRead);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const markAsRead = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const notificationRead = await NotificationRead.findOneAndUpdate(
      {
        notification: notification._id,
        user: userId,
      },
      {
        $set: { isRead: true },
      },
      {
        new: true,
      }
    );

    if (!notificationRead) {
      return res.status(404).json({ message: "Read record not found" });
    }

    res.status(200).json({
      message: "Read successfully",
      data: notificationRead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllNotificationsRead, markAsRead };
