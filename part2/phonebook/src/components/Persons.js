const Person = ({name, number, deletePerson}) => {
    return (
      <p>
        {name} {number} <button onClick={deletePerson}>delete</button>
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

export default Persons;