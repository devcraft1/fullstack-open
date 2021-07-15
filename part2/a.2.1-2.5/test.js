const course = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  },
];

const sorted = array
  .map(({ tally, ...rest }) => ({
    sum: tally.reduce((r, e) => r + e, 0),
    tally,
    ...rest,
  }))
  .sort((a, b) => b.sum - a.sum)
  .map(({ sum, ...rest }) => rest);

console.log(sorted);
