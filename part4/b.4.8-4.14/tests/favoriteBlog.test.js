const listHelper = require("../utils/list_helpers");

describe("favoriteBlog", () => {
  const favorite = {
    title: "Node.js",
    author: "Ukonu Dennis",
    likes: 12,
  };
  const blogs = [
    {
      title: "Javascript",
      author: "Joseph Peculiar",
      likes: 7,
    },

    {
      title: "Node.js",
      author: "Ukonu Dennis",
      likes: 12,
    },
  ];
  test("return the entry with most likes", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(favorite);
  });
});
