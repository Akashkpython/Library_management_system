const Notification = require('../models/Notification');

// Get my notifications
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

// Mark notification as read
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    if (notification.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    next(err);
  }
};
