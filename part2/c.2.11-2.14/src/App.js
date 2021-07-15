import axios from "axios";
import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import CountryDetail from "./Components/Countries";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterNames, setFilterNames] = useState(false);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>page is loading .....</p>;
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      find country
      <div>
        <input
          type="text"
          placeholder="Search Countries"
          onChange={handleSearch}
        />
      </div>
      {filteredCountries.map((country, id) => (
        <CountryDetail key={id} {...country} setSearch={setSearch} />
      ))}
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
      />
      <h2>Numbers</h2>
      {persons.map((person, id) => (
        <Persons key={id} person={person} />
      ))}
    </div>
  );
};

export default App;
