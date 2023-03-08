import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PersonsService from './services/PersonsService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const query_function = (element) => element.name.toLowerCase().includes(query.toLowerCase());
  const filtered_persons = persons.filter(person => query_function(person));

  const changeMessage = (message, error) => {
    setMessage(message)
    setIsError(error);
    setTimeout(()=> {
      setMessage(null);
      setIsError(false);
    }, 5000)
  }
  const updatePerson = (person) => {
    if (!newNumber) {
      const message = 'Blank number is invalid';
      changeMessage(message, true);
      return;
    }

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
        const message = `Updated ${returnedPerson.name}`;
        changeMessage(message, false);
      })
      .catch(error => {
        console.log(error);
        const message = `Information of ${updatedPerson.name} has already been removed from server`;
        changeMessage(message, true);
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  const deletePerson = (person) => {
    const id = person.id;
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if (!confirm){
      return;
    }
    PersonsService
      .remove(id)
      .then(data => {
        setPersons(persons.filter(person => person.id !== id))
        const message = `Deleted ${person.name}`;
        changeMessage(message, false);
      })
      .catch(error => {
        console.log(error);
        const message = `Information of ${person.name} has already been removed from server`;
        changeMessage(message, true);
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) {
      const message = 'Blank name is invalid';
      changeMessage(message, true);
      return;
    }
    if (!newNumber) {
      const message = 'Blank number is invalid';
      changeMessage(message, true);
      return;
    }
    
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
        const message = `Added ${returnedPerson.name}`;
        changeMessage(message, false);
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
      <Notification message={message} isError={isError} />
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