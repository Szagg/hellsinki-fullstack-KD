import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    const newPerson = { name: newName, phone: newPhone }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(prev => prev.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        console.error('Failed to save person:', error)
        alert('Failed to save person to server')
      })
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Failed to delete person:', error)
          alert('Failed to delete person from server')
        })
    }
  }

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
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App