const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
// const logger = require("../utils/logger");

blogRouter.get("/", async (request, response) => {
  try {
    const allBlogs = await Blog.find({});
    response.json(allBlogs);
  } catch (e) {
    next(e);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.author || !body.title || !body.url)
    return response.status(400).json({ error: "title or url is missing" });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  try {
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch (e) {
    next(e);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    const deleteBlog = await Blog.findByIdAndRemove(request.params.id);
    response.status(204).json(deleteBlog);
  } catch (e) {
    console.log(e);
  }
});

module.exports = blogRouter;
