const jwt = require("jsonwebtoken");
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

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" });

  const user = await User.findById(decodedToken.id);

  if (!body.author || !body.title || !body.url)
    return response.status(400).json({ error: "title or url is missing" });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
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

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (e) {
    console.log(e);
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
