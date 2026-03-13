const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id || person.name}>
        {person.name} {person.number || person.phone}
        <button onClick={() => onDelete(person.id)}>delete</button>
      </li>
    ))}
  </ul>
)
export default Persons