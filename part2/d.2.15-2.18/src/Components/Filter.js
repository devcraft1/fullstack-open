import React from "react";

const Filter = (props) => {
  const handleNames = (event) => {
    props.setFilterNames(event.target.value);
  };
  const filter = props.persons.filter((person) =>
    person.name.includes(props.filterNames)
  );

  const Display = ({ person }) => {
    return <li>{person.name}</li>;
  };

  return (
    <div>
      filter shown with
      <input type="text" placeholder="search" onChange={handleNames} />
      <div>
        {filter.map((person) => (
          <Display key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Filter;
