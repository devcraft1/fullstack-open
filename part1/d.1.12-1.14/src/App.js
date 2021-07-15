import React, { useState } from "react";
const App = () => {
  let anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(0);
  // console.log("this is the state", setVote);

  const handleSelect = (e) => {
    const array = anecdotes.length;
    setSelected(Math.floor(Math.random() * array));
  };

  const handleVotes = (e) => {
    setVote(vote + 1);
  };

  return (
    <div>
      <p>
        {anecdotes[selected]}
        <br /> has {vote} votes
      </p>

      <div>
        {vote}
        <button onClick={handleVotes}> Vote</button>
        <button onClick={handleSelect}>Next anecdotes</button>
      </div>
    </div>
  );
};

export default App;
