import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PersonsService from './services/PersonsService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const query_function = (element) => element.name.toLowerCase().includes(query.toLowerCase());
  const filtered_persons = persons.filter(person => query_function(person));

  const updatePerson = (person) => {
    const id = person.id;
    const updatedPerson = {
      ...person,
      number: newNumber
    }
    PersonsService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id? person : returnedPerson))
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.log(error))
  }
  const deletePerson = (person) => {
    const id = person.id;
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if (!confirm){
      return;
    }
    PersonsService
      .remove(id)
      .then(data => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => console.log(error))
  }
  const addPerson = (e) => {
    e.preventDefault();
    
    if (persons.some(person => person.name === newName) 
        &&
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const person = persons.find(person => person.name === newName);
      updatePerson(person);
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