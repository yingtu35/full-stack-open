import { useState, useEffect } from 'react'
import PersonsService from './services/PersonsService'

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
const Person = ({name, number, deletePerson}) => {
  return (
    <p>
      {name} 
      {number} 
      <button onClick={deletePerson}>delete</button>
    </p>
  )
}
const Persons = ({persons, deletePerson}) => persons.map(person => 
  <Person key={person.id} 
          name={person.name} 
          number={person.number} 
          deletePerson={() => deletePerson(person)} 
  />
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const query_function = (element) => element.name.toLowerCase().includes(query.toLowerCase());
  const filtered_persons = persons.filter(person => query_function(person));

  const deletePerson = (person) => {
    const id = person.id;
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if (!confirm){
      return;
    }
    PersonsService
      .remove(id)
      .then(data => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => console.log(error))
  }
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

    PersonsService
      .create(new_person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    PersonsService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons);
      })
  }, [])
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
      <Persons persons={filtered_persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App