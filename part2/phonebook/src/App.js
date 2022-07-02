import { useState, useEffect } from "react";
import personService from "./services/persons";

const DeleteButton = ({ person }) => {
  const handleDeleteButton = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id);
      window.location.reload();
    }
  };

  return <button onClick={handleDeleteButton}>{"delete"}</button>;
};

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {`${person.name} ${person.number}`} <DeleteButton person={person} />
    </p>
  ));
};

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  addPerson,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const isExisting = persons.some((person) => {
    return person.name === newName;
  });

  const addPerson = (event) => {
    event.preventDefault();
    if (isExisting) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObject).then((returnedNote) => {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={filteredPersons} />
      </div>
    </div>
  );
};

export default App;
