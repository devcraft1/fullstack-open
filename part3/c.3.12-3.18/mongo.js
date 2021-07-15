const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${MONGODB_PASSWORD}@cluster1.7mhih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Person = mongoose.model("Note", personSchema);

const person = new Person({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

person.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
