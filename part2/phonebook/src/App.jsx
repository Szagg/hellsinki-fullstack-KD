
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null) 

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updated = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updated)
          .then(returned => {
            setPersons(prev => prev.map(p => p.id !== existingPerson.id ? p : returned))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returned.name}`)
          })
          .catch(err => {
            showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
            setPersons(prev => prev.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

 
    if (persons.some(p => p.number === newNumber)) {
      showNotification(`Number ${newNumber} is already in phonebook`, 'error')
      return
    }

    const personObject = { name: newName, number: newNumber }
    personService.create(personObject)
      .then(returned => {
        setPersons(prev => prev.concat(returned))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returned.name}`)
      })
      .catch(err => {
        showNotification('Failed to add person', 'error')
      })
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`)
        })
        .catch(() => {
          showNotification(`Information of ${person.name} has already been removed from server`, 'error')
          setPersons(prev => prev.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
