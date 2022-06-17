import { useState } from "react";

const Number = ({ person }) => {
  return person.content + "\r\n" + "jotain";
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newName,
      id: newName.name,
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
        <div>debug: {newName}</div>
        <div>
          name: <input />
        </div>
        <div>
          <input value={newName} onChange={handleNoteChange} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Number key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
