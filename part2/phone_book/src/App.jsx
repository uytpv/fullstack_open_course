import { useEffect, useState } from "react";
import axios from "axios";
import phonebookService from "./services/phonebook";

const Filter = ({ searchName, onSearchChange }) => (
  <div>
    filter shown with:
    <input value={searchName} onChange={onSearchChange} />
  </div>
);

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}{" "}
        <a href="#" onClick={() => onDelete(person.id)}>
          delete
        </a>
      </li>
    ))}
  </ul>
);

const Notification = ({ message }) => {
  const notifyStyle = {
    backgroundColor: "#f0f0f0",
    color: "green",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 16,
    border: "2px solid green",
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return <div style={notifyStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const add = (event) => {
    event.preventDefault();

    const personIsExist = persons.find((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };
    if (personIsExist) {
      if (
        window.confirm(
          newName +
            " is already added to phonebook, replace the old number with new one?"
        )
      ) {
        phonebookService
          .update(personIsExist.id, newPerson)
          .then((response) => {
            console.log(response);
            phonebookService.getAll().then((response) => {
              setPersons(response.data);
            });
            setNewName("");
            setNewNumber("");
            setMessage(newName + " updated");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      phonebookService.create(newPerson).then((response) => {
        console.log(response);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setMessage("Added " + newName);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
      // setPersons([persons.concat(newPerson)]);
      // setNewName("");
      // setNewNumber("");
    }
  };

  const searchResult =
    searchName.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : persons;

  const onNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const onNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const onSearchChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  const onDeletePerson = (id) => {
    const deletePerson = persons.find((person) => person.id === id);

    console.log(deletePerson);
    if (window.confirm("Delete " + deletePerson.name + "?")) {
      phonebookService.delete(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />

      <Filter searchName={searchName} onSearchChange={onSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        onSubmit={add}
      />
      <h2>Numbers</h2>
      <Persons persons={searchResult} onDelete={onDeletePerson} />
    </div>
  );
};

export default App;
