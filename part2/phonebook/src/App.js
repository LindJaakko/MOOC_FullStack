import { useState } from "react";

const Number = ({ person }) => {
  return <p>{person.name + "\r\n"}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const isExisting = persons.some((person) => {
    if (person.name === newName) {
      return true;
    }
    return false;
  });

  const addPerson = (event) => {
    event.preventDefault();
    if (isExisting) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        name: <input value={newName} onChange={handleNoteChange} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Number key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
