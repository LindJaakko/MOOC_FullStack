import { useState } from "react";

const Number = ({ person }) => {
  return person.name + "\r\n" + "jotain";
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
    };
    setPersons(persons.concat(noteObject));
    setNewName("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <input value={newName} onChange={handleNoteChange} />
        <div>
          name: <input />
        </div>
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
