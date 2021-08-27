const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helpers = require("./testhelpers/test_helpers");
const logger = require("../utils/logger");

beforeEach(async () => {
  await Blog.deleteMany({});
  logger.info("cleared");
  let blogObject = new Blog(helpers.initialBlogs[0]);
  await blogObject.save();
  logger.info("saved");
  blogObject = new Blog(helpers.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helpers.initialBlogs.length);
});

test("a specific blog is within the returned blogs ", async () => {
  const response = await api.get("/api/blogs");
  const blogContent = response.body.map((r) => r.title);
  expect(blogContent).toContain("React");
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Jhon Doe",
    url: "fullstackopen.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogAtEnd = await helpers.blogsInDb();

  expect(blogAtEnd).toHaveLength(helpers.initialBlogs.length);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "React",
    author: "Ukonu Dennis",
    url: "url",
    likes: 12,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const title = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helpers.initialBlogs.length + 1);
  expect(title).toContain("React");
});

test("a specific blog can be viewed", async () => {
  const blogAtStart = await helpers.blogsInDb();

  const blogToView = blogAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("a blog can be deleted", async () => {
  const blogAtStart = await helpers.blogsInDb();
  const blogToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);
  const blogAtEnd = await helpers.blogsInDb();
  expect(blogAtEnd).toHaveLength(helpers.initialBlogs.length - 1);

  const author = blogAtEnd.map((r) => r.author);
  expect(author).not.toContain(blogToDelete.author);
}, 1000);

afterAll(() => {
  mongoose.connection.close();
});
