const jwt = require("jsonwebtoken");

function UserMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: "Not Authorized!", message: "Missing authorization header" });
  }

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "Not Authorized!", message: "Invalid access token" });
  }

  try {
    const decoded = jwt.verify(accessToken, "secret");
    req.userId = decoded.data;
    return next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Not Authorized!", message: "Invalid access token" });
    }
    return res.status(500).json({ error: "Internal Server Error", message: "An error occurred" });
  }
}

module.exports = UserMiddleware;
