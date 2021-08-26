const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helpers = require("./testhelpers/test_helpers");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helpers.initialBlogs[0]);
  await blogObject.save();
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

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Jhon Doe",
    url: "fullstackopen.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogAtEnd = await helpers.blogsInDb();

  expect(blogAtEnd).toHaveLength(helpers.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
