import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// --- PHONEBOOK (PERSONS) ---

const dataFile = path.join(__dirname, 'db.json')
const data = JSON.parse(await fs.readFile(dataFile, 'utf8'))
let persons = Array.isArray(data.persons) ? data.persons : []

const generateId = () => Math.floor(Math.random() * 1000000000000).toString()
const saveData = async () => {
  await fs.writeFile(dataFile, JSON.stringify({ persons }, null, 2))
}

app.get(['/api/persons', '/persons'], (req, res) => {
  res.json(persons)
})

app.get(['/api/persons/:id', '/persons/:id'], (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)
  if (person) res.json(person)
  else res.status(404).end()
})

app.delete(['/api/persons/:id', '/persons/:id'], async (req, res) => {
  const id = req.params.id
  persons = persons.filter((p) => p.id.toString() !== id.toString())
  await saveData()
  res.status(204).end()
})

app.post(['/api/persons', '/persons'], async (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const person = { name: body.name, number: body.number, id: generateId() }
  persons.push(person)
  await saveData()
  res.json(person)
})

app.put(['/api/persons/:id', '/persons/:id'], async (req, res) => {
  const id = req.params.id
  const body = req.body
  if (!body.name) return res.status(400).json({ error: 'name missing' })
  if (!body.number) return res.status(400).json({ error: 'number missing' })
  const existingPerson = persons.find((p) => p.id === id)
  if (!existingPerson) return res.status(404).end()
  const updatedPerson = { ...existingPerson, name: body.name, number: body.number }
  persons = persons.map((p) => (p.id === id ? updatedPerson : p))
  await saveData()
  res.json(updatedPerson)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  )
})

// --- NOTES ---

const notesFile = path.join(__dirname, 'notes.json')
let notes = []
try {
  const notesData = JSON.parse(await fs.readFile(notesFile, 'utf8'))
  notes = Array.isArray(notesData.notes) ? notesData.notes : []
} catch (e) {
  notes = []
}

const saveNotes = async () => {
  await fs.writeFile(notesFile, JSON.stringify({ notes }, null, 2))
}

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// GET note by id
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(n => n.id === id)
  if (note) res.json(note)
  else res.status(404).end()
})

// POST new note
app.post('/api/notes', async (req, res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const note = {
    id: Math.floor(Math.random() * 1000000000000).toString(),
    content: body.content,
    important: body.important || false,
  }
  notes.push(note)
  await saveNotes()
  res.json(note)
})

// DELETE note
app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  notes = notes.filter(n => n.id !== id)
  await saveNotes()
  res.status(204).end()
})

// --- UNKNOWN ENDPOINT ---
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})