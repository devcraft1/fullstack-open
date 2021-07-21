require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./model/person");

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

// Home page
app.get("/", (request, response) => {
  response.send("Person home page");
});

// Get all persons
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
app.get("/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Add a person
app.post("/persons", (request, response) => {
  const body = request.body;
  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  if (body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

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
  });

  person
    .save()
    .then((person) => person.toJSON())
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => console.log(error));
});

// Update person
app.put("/persons/:id", (request, response) => {
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
    .catch((error) => console.log(error));
});

// Delete person
app.delete("/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => console.log(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

var PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
