const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("content", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("Person home page");
});

app.get("/persons", (request, response) => {
  response.json(persons);
});

app.get("/persons/insight", (request, response) => {
  let date = new Date("July 06, 2021 12:00:00");
  const phonebook = `phonebook has ${persons.length} people`;
  response.send(phonebook + "<br><br>" + date);
});

app.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const findPersons = persons.find((val) => val.id === id);
  response.json(findPersons);
  if (!findPersons) {
    response.status(404).end();
  }
});

app.post("/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "name and number missing",
    });
  }
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  const addPerson = persons.concat(person);

  response.json(addPerson);
});

app.delete("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons.filter((remove) => remove.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
