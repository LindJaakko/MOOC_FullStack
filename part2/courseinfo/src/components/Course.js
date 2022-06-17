import React from "react";

const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, i) => (
        <Part key={i} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
