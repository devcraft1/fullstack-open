const Blog = require("../../models/blog");

const initialBlogs = [
  {
    title: "React",
    author: "Ukonu Dennis",
    url: "url",
    likes: 12,
  },
  {
    title: "Node",
    author: "Joseph Peculiar",
    url: "url",
    likes: 7,
  },
];
const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "Jhon Doe",
    url: "https://fullstackopen.com/",
    likes: 4,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
