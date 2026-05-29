import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)







;(async () => {
  const app = express()

app.use(express.static('dist')) // <-- add this line

morgan.token('body', (req) => JSON.stringify(req.body))


app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)


  app.use(cors())
  app.use(express.json())
  app.use(morgan('tiny')) 

  const dataFile = path.join(__dirname, 'db.json')
  const data = JSON.parse(await fs.readFile(dataFile, 'utf8'))
  let persons = Array.isArray(data.persons) ? data.persons : []




  const generateId = () => {
    return Math.floor(Math.random() * 1000000000000).toString()
  }

  const saveData = async () => {
    await fs.writeFile(dataFile, JSON.stringify({ persons }, null, 2))
  }

  
  app.get(['/api/persons', '/persons'], (request, response) => {
    response.json(persons)
  })

  
  app.get(['/api/persons/:id', '/persons/:id'], (request, response) => {
    const id = request.params.id
    const person = persons.find((person) => person.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete(['/api/persons/:id', '/persons/:id'], async (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id.toString() !== id.toString()) 
    await saveData()
    response.status(204).end()
  })

  
  app.post(['/api/persons', '/persons'], async (request, response) => { 
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (!body.number) {
      return response.status(400).json({ error: 'number missing' })
    }

    if (persons.some((person) => person.name === body.name)) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }

    persons = persons.concat(person)
    await saveData()
    response.json(person)
  })

 
  app.put(['/api/persons/:id', '/persons/:id'], async (request, response) => {
    const id = request.params.id
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (!body.number) {
      return response.status(400).json({ error: 'number missing' })
    }

    const existingPerson = persons.find((person) => person.id === id)

    if (!existingPerson) {
      return response.status(404).end()
    }

    const updatedPerson = {
      ...existingPerson,
      name: body.name,
      number: body.number,
    }

    persons = persons.map((person) => (person.id === id ? updatedPerson : person))
    await saveData()
    response.json(updatedPerson)
  })

  app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
  })


  app.use((request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})();