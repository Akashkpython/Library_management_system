module.exports = function roleCheck(allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Unauthorized role.' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Role check failed.' });
    }
  };
};
