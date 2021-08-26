const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

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

blogRouter.delete("/:id", async (request, response) => {
  try {
    const deleteBlog = await Blog.findByIdAndRemove(request.params.id);
    response.json(deleteBlog);
  } catch (e) {
    next(e);
  }
});

module.exports = blogRouter;
