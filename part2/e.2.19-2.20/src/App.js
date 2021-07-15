import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterNames, setFilterNames] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter
        setFilterNames={setFilterNames}
        filterNames={filterNames}
        persons={persons}
      />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        useEffect={useEffect}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Persons key={person.id} person={person} setPersons={setPersons} />
      ))}
    </div>
  );
};

export default App;
