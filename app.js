require("dotenv").config(); 
const express = require("express");
const path = require("path");
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const methodOverride = require('method-override');

const PORT =process.env.PORT || 8000;
const app = express();
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(cookieparser());

mongoose.connect(process.env.MONGO_URL)
.then((e) => console.log("mongodb connected"))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
    return res.render("signup");
})

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT, () => console.log(`server started at ${PORT}`))
