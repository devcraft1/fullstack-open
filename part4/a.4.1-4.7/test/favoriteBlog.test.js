const listHelper = require("../utils/list_helpers");

describe("favoriteBlog", () => {
  const favorite = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  };
  const blogs = [
    {
      title: "Linux distribution system",
      author: "Michael Chan",
      likes: 7,
    },

    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];
  test("return the entry with most likes", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(favorite);
  });
});
