const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id || person.name}>
        {person.name} {person.number || person.phone}
      </li>
    ))}
  </ul>
)
export default Persons