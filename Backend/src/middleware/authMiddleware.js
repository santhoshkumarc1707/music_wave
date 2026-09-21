import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    jwt.verify(
      token,
      process.env.JWTPRIVATEKEY,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
          });
        }

        req.user = decoded;

        next();
      }
    );
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default authMiddleware;