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
  const body = request.body;
  if (!body.author || !body.title || !body.url)
    return response.status(400).json({ error: "title or url is missing" });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  blog
    .save()
    .then((result) => {
      response.json(result.toJSON);
    })
    .catch((error) => logger.error(error));
});

blogRouter.delete("/:id", async (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => logger.error(error));
});

module.exports = blogRouter;
