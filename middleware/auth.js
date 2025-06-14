// middlewares/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "myverysecretkey";

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/user/signin");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.log(err);
    return res.redirect("/user/signin");
  }
}

module.exports = isLoggedIn;
