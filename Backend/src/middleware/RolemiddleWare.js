import Role from "../models/Role.js";

const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.roleId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      const role = await Role.findById(req.user.roleId);

      if (!role) {
        return res.status(403).json({
          success: false,
          message: "Role not found.",
        });
      }

      if (!allowedRoles.includes(role.name)) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access this resource.",
        });
      }

      // Store role information in request
      req.role = role;

      next();
    } catch (error) {
      console.error("Role middleware error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
};

export default roleMiddleware;