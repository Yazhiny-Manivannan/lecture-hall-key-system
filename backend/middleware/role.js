export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user comes from verifyToken middleware
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }

      // check role permission
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "You do not have permission to access this resource",
        });
      }

      next();

    } catch (error) {
      return res.status(500).json({
        message: "Role authorization error",
      });
    }
  };
};