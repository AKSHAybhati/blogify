const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "myverysecretkey";

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const Matched = await bcrypt.compare(password, user.password);

    if (!Matched) {
      return res.render("signin", { error: "Invalid email or password" });
    }

    const token = JWT.sign({ id: user._id, email: user.email }, JWT_SECRET);

    // Set token in httpOnly cookie (more secure)
    res.cookie("token", token, {
      httponly: true,
      secure: false,
    });

    return res.redirect("/blog/create")
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token", { path: "/" }); // Matches cookie path
  res.redirect("/user/signin");
});

module.exports = router;
