import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(err => {
        console.error('Error loading persons:', err)
        setError('Failed to load phonebook data. Please try again later.')
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    setError('')
    const existingPerson = persons.find(person => person.name === newName)
    const numberExists = persons.some(person => person.number === newNumber && person.id !== existingPerson?.id)
    if (numberExists) {
      alert(`number ${newNumber} is already added to phonebook`)
      return
    }

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(prev => prev.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            console.error('Error updating person:', err)
            setError('Failed to update person. Please try again.')
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(prev => prev.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.error('Error adding person:', err)
          setError('Failed to add person. Please try again.')
        })
    }
  }

  const handleDeletePerson = (id) => {
    setError('')
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
        })
        .catch(err => {
          console.error('Error deleting person:', err)
          setError('Failed to delete person. Please try again.')
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Filter filter={filter} onChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        onNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App