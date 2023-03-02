const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const fileUpload = require("../middleware/fileUpload");

router.post("/", fileUpload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.patch("/edit/:bid", blogController.updateBlog);
router.delete("/:bid", blogController.deleteBlog);

module.exports = router;
