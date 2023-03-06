import { useState } from 'react'

const Filter = ({value, onValueChange}) => <div>filter shown with<input value={value} onChange={onValueChange}/></div>
const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.name} onChange={props.onNameChange} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = ({persons}) => persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const query_function = (element) => element.name.toLowerCase().includes(query.toLowerCase());
  const filtered_persons = persons.filter(person => query_function(person));

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const new_person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(new_person));
    setNewName('');
    setNewNumber('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onValueChange={(e) => setQuery(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm name={newName} 
                  number={newNumber}
                  onNameChange={(e) => setNewName(e.target.value)}
                  onNumberChange={(e) => setNewNumber(e.target.value)}
                  onSubmit={addPerson} 
      />
      <h2>Numbers</h2>
      <Persons persons={filtered_persons} />
    </div>
  )
}

export default App