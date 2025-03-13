const jwt = require("jsonwebtoken");

const userAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (
      req.headers.authorization === (null || undefined) ||
      token === (null || undefined)
    ) {
      res.status(400).json({ error: "Token is required." });
      return;
    } else {
      req.token = token;
      next();
    }

    // setup lang jwt, di ko pa alam kung paano ma-test ng walang frontend
    // if (!req.header.authorization || !token) {
    //   res.status(400).json({ error: "Token is required." });
    // }

    // const decoded = jwt.decoded(token);

    // if (!decoded || !decoded.id || decoded === null) {
    //   res.status(400).json({ error: "Invalid token" });
    // }

    // req.token = decode.id;
  } catch (error) {
    console.error("JWT Middleware Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { userAuthentication };
