import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '12-34-56789' },
     { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    const phoneExists = persons.some(person => person.phone === newPhone)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (phoneExists) {
      alert(`number ${newPhone} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newName, phone: newPhone }))
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>  
          filter shown with: 
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <h2>add a new</h2>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
        </div>
        <div>
          number: 
          <input 
            value={newPhone} 
            onChange={(e) => setNewPhone(e.target.value)} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <div>debug: {newName} , {newPhone}</div>
      
      <h2>Numbers</h2>
      
      <ul>
        {persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => 
            <li key={`${person.name}-${person.phone}`}>{person.name} - {person.phone}</li>
        )}
      </ul>
    </div>
  )
}

export default App