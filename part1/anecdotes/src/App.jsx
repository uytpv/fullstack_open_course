import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
    "Programming is like writing a book... except if you miss a single comma on page 126, the whole thing makes no sense.",
    "There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
    "Debugging: Being the detective in a crime movie where you are also the murderer.",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    "Real programmers count from 0.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdoteClick = () => {
    setSelected(Date.now() % anecdotes.length); // get current timestamp and mod with length of anecdotes array
  };
  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  // find the anecnote with max vote
  const maxVotes = Math.max(...votes);
  const topAnecdoteIndex = votes.indexOf(maxVotes);

  console.log(topAnecdoteIndex);
  return (
    <div>
      <h1>Anecdote of the day </h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <p>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleNextAnecdoteClick}>next anecdote</button>
      </p>

      <h1>Anecdote with max votes</h1>
      {anecdotes[topAnecdoteIndex]}
      <p>has {votes[topAnecdoteIndex]} votes</p>
    </div>
  );
};

export default App;
