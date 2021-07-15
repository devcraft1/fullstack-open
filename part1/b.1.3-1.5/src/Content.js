import React from "react";

const Content = (props) => {
  const contents = props.contents.map((display) => (
    <div>
      {display.name} {display.exercises}
    </div>
  ));
  return <div>{contents}</div>;
};

export default Content;
