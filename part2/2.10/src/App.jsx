import { useState } from 'react'

const Filter = ({ filter, onChange }) => (
  <div>
    filter shown with:
    <input value={filter} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, onNameChange, newPhone, onPhoneChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name:
      <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number:
      <input value={newPhone} onChange={onPhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <li key={`${person.name}-${person.phone}`}>{person.name} - {person.phone}</li>
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '12-34-56789' , id: 1},
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

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        onNameChange={e => setNewName(e.target.value)}
        newPhone={newPhone}
        onPhoneChange={e => setNewPhone(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App