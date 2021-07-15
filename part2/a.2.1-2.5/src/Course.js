import React from "react";

const Course = ({ course }) => {
  const [courses, others] = course;
  return (
    <div>
      <h1>{courses.name}</h1>
      <p>{courses.id}</p>
      <div>
        {courses.parts.map((course) => {
          return (
            <div key={courses.id}>
              {course.name}
              {course.exercises}
            </div>
          );
        })}
      </div>
      <p>
        Total =
        {courses.parts.reduce((accumulator, sum) => {
          let total = accumulator + sum.exercises;
          return total;
        }, 0)}
      </p>
      <div>
        <h1>{others.name}</h1>
        <p>{others.id}</p>
        <div>
          {others.parts.map((course) => {
            return (
              <div key={courses.id}>
                {course.name}
                {course.exercises}
              </div>
            );
          })}
        </div>
        <p>
          Total =
          {others.parts.reduce((accumulator, sum) => {
            let total = accumulator + sum.exercises;
            return total;
          }, 0)}
        </p>
      </div>
    </div>
  );
};
export default Course;
