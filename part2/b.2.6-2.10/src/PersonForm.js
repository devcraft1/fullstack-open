import React from "react";

const PersonForm = (props) => {
  const AddNames = (event) => {
    event.preventDefault();
    if (
      props.persons.find(
        (person) =>
          person.name === props.newName && person.number === props.newNumber
      )
    ) {
      window.alert(`${props.newName} is already added to phonebook`);
    } else {
      const numberObject = { name: props.newName, number: props.newNumber };
      props.setPersons(props.persons.concat(numberObject));
      props.setNewNumber();
      props.setNewName("");
    }
  };

  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={AddNames}>
        <div>
          name: <input value={props.newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={props.newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
