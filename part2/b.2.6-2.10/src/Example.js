import React, { useState } from "react";

const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

const Example = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true,
    },
  ]);
  const [newNote, setNewNote] = useState("Add new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNotes = (event) => {
    setNewNote(event.target.value);
  };

  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNotes} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default Example;
