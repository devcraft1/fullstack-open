const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (request, response) => {
  await Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogRouter.post("/", async (request, response) => {
  const body = await request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  await blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogRouter.delete("/:id", async (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
