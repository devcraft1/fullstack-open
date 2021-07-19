require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
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

// const persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// Home page
app.get("/", (request, response) => {
  response.send("Person home page");
});

// Get all person
app.get("/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Insight
app.get("/persons/insight", (request, response) => {
  Person.find({}).then((persons) => {
    let date = new Date("July 06, 2021 12:00:00");
    const phonebook = `phonebook has ${persons.length} people`;
    response.send(phonebook + "<br><br>" + date);
  });
});

// Get a person
app.get("/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log("wrong ID");
      next(error);
    });
});

// Add a person
app.post("/persons", (request, response, next) => {
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

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person
    .save()
    .then((person) => person.toJSON())
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

// Update person
app.put("/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson === null) {
        return response.status(404).end();
      }
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Delete person
app.delete("/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
