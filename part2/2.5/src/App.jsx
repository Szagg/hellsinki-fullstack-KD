const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((p) => (
      <Part key={p.id} part={p} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const sum = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
      ],
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      {courses.map((c) => (
        <Course key={c.id} course={c} />
      ))}
    </div>
  )
}

export default App