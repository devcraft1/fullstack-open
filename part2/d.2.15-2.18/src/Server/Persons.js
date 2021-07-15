import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
  return axios.get(baseUrl);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export { getPersons, createPerson, deletePerson, updatePerson };
