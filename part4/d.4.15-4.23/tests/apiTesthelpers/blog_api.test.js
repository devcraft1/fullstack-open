const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const helpers = require("./test_helpers");
const Blog = require("../../models/blog");
const User = require("../../models/user");
const logger = require("../../utils/logger");

beforeEach(async () => {
  await Blog.deleteMany({});
  logger.info("cleared");
  let blogObject = new Blog(helpers.initialBlogs[0]);
  await blogObject.save();
  logger.info("saved");
  blogObject = new Blog(helpers.initialBlogs[1]);
  await blogObject.save();
});

describe("wen there is initially some blogs saved", () => {
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
});

describe("a specific blog can be viewed", () => {
  test("succeeds with a valid id", async () => {
    const blogAtStart = await helpers.blogsInDb();

    const blogToView = blogAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });
  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helpers.nonExistingId();
    console.log(validNonexistingId);

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new blog", () => {
  test("succeeds with status code 200 if data is valid", async () => {
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

  test("fails with status code 400 if data is invalid", async () => {
    const newBlog = {
      author: "Jhon Doe",
      url: "fullstackopen.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogAtEnd = await helpers.blogsInDb();

    expect(blogAtEnd).toHaveLength(helpers.initialBlogs.length);
  });
}, 1000);

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogAtStart = await helpers.blogsInDb();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogAtEnd = await helpers.blogsInDb();
    expect(blogAtEnd).toHaveLength(helpers.initialBlogs.length - 1);

    const author = blogAtEnd.map((r) => r.author);
    expect(author).not.toContain(blogToDelete.author);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
