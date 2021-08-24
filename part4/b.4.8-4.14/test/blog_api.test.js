mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    _id: "611e9319689d6e6c4f491084",
    title: "Things fall apart",
    author: "String",
    url: "String",
    likes: 1223,
    __v: 0,
  },
  {
    _id: "611e957f9de74771c40014f9",
    title: "Things fall apart",
    author: "rtyeue",
    url: "rryy",
    likes: 1223,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(2);
});

test("POST /api/blogs works", async () => {
  const blogsBefore = await Blog.find({});

  const newPost = {
    _id: "611e9319689d6e6c4f491084",
    title: "Things fall apart",
    author: "String",
    url: "String",
    likes: 12,
    __v: 0,
  };

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await Blog.find({});

  expect(blogsAfter.length).toBe(blogsBefore.length + 1);

  const titles = blogsAfter.map((n) => n.title);
  expect(titles).toContain("Things fall apart");
});

test("POST /api/blogs new blogs has 0 likes if not specified", async () => {
  const newPost = {
    title: "Things fall apart",
    author: "String",
    url: "String",
  };

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blog = await Blog.findById({ author: "String" });
  console.log("blogsAfter: ", blog);

  expect(blog.likes).toBe(0);
});

test("POST /api/blogs check if title is empty, 400 Bad request is returned", async () => {
  const newPost = {
    author: "String",
    url: "String",
    likes: 1,
  };

  await api.post("/api/blogs").send(newPost).expect(400);
});

test("POST /api/blogs check if url is empty, 400 Bad request is returned", async () => {
  const newPost = {
    author: "String",
    url: "String",
    likes: 1,
  };

  await api.post("/api/blogs").send(newPost).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
