import React from "react";

const Header = (props) => {
  const head = props.header;
  return (
    <div>
      <h1>{head.name}</h1>
    </div>
  );
};

export default Header;
