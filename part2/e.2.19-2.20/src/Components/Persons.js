import React from "react";
import { deletePerson } from "../Server/Persons";

const Persons = ({ person }, props) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id)
        .then(() => {
          props.setPersons(person.filter((person) => person !== person.id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(handleDelete);
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Persons;
