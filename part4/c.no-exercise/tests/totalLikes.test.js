const listHelper = require("../utils/list_helpers");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "611e92ba06c5b26b9bb385bd",
      title: "Things fall apart",
      author: "String",
      url: "String",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});
