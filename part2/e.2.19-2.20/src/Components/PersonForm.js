import React from "react";
import { getPersons, createPerson } from "../Server/Persons";

const PersonForm = (props) => {
  props.useEffect(() => {
    getPersons().then((response) => {
      props.setPersons(response.data);
    });
  }, []);

  const addNames = (event) => {
    event.preventDefault();
    if (
      props.persons.find(
        (person) =>
          person.name === props.newName && person.number === props.newNumber
      )
    ) {
      props.setErrorMessage(`${props.newName} is already added to phonebook`);
      setTimeout(() => {
        props.setErrorMessage(null);
      }, 5000);
    } else {
      const numberObject = { name: props.newName, number: props.newNumber };
      createPerson(numberObject)
        .then((res) => {
          props.setPersons(props.persons.concat(res.data));
          props.setNewNumber();
          props.setNewName("");
          props.setErrorMessage(`Added ${props.newName}`);
          setTimeout(() => {
            props.setErrorMessage(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
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
      <form onSubmit={addNames}>
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
