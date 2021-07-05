const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;
  const user = req.user;

  if (!token && !user) {
    return res.status(401).send("No token, authorization denied");
  }

  if (user) next();
  else{
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
  } catch (err) {
      res.status(401).send("Token is not valid");
    }
  }
};

module.exports = protect;
