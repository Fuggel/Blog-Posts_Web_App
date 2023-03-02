const HttpError = require("../models/httpError");
const Blog = require("../models/blogModel");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find blogs.", 500)
    );
  }

  res.status(200).json(blogs);
};

const createBlog = async (req, res, next) => {
  const { title, text } = req.body;

  if (!title || !text)
    return next(new HttpError("Please add a title and text", 400));

  let createdBlog;
  if (!req.file) {
    createdBlog = new Blog({
      title,
      text,
    });
  } else {
    createdBlog = new Blog({
      title,
      text,
      image: req.file.path,
    });
  }

  try {
    await createdBlog.save();
  } catch (err) {
    return next(new HttpError("Creating blog failed, please try again.", 500));
  }

  res.status(201).json({ createdBlog });
};

const updateBlog = async (req, res, next) => {
  const { title, text } = req.body;
  const blogId = req.params.bid;

  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update blog.", 500)
    );
  }

  if (title) blog.title = title;
  if (text) blog.text = text;

  try {
    await blog.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update blog.", 500)
    );
  }

  res.status(200).json({ blog: blog.toObject({ getters: true }) });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.bid;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId);
  } catch (err) {
    new HttpError("Something went wrong, could not delete blog.", 500);
  }

  if (!blog) {
    return next(new HttpError("Could not find blog for this id.", 404));
  }

  res.status(200).json({ message: "Deleted blog." });
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
