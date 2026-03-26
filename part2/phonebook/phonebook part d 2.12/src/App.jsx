import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
 



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(prev => prev.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        console.error('Failed to save person:', error)
        alert('Failed to save person to server')
      })
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