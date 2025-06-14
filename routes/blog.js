const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerconfig")
const Blog = require("../model/blog")
const isloggedin = require("../middleware/auth")

router.get("/info", async(req, res) => {
    const blogs = await Blog.find();
    res.render("blog",{blogs}); 
});

router.get("/create",isloggedin, (req, res) => {
  return res.render("blogform");
});

router.get("/:id", async(req,res) =>{
    const blog = await Blog.findById(req.params.id);
    return res.render("blogdesc",{
        user:req.user,
        blog,
    })
})

router.delete("/:id",isloggedin, async(req,res) =>{
    await Blog.findByIdAndDelete(req.params.id);
    return res.redirect("/blog/info");
})

router.post("/create",isloggedin,upload.single("image"), async(req,res) =>{
    const {title,para} = req.body;
    const imagePath = req.file ? "/upload/" + req.file.filename : "default.jpg";
    await Blog.create({
        title,
        para,
        image:imagePath,
    })
    return res.redirect("/blog/info");
})

module.exports = router;