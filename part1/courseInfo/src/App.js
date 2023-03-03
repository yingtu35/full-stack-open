const Part = ({name, exercises}) => <p>{name} {exercises}</p> 

const Header = ({course}) => <h1>{course}</h1>
const Content = ({parts}) => parts.map(part => <Part name={part.name} exercises={part.exercises} />)
const Total = ({parts}) => <p>Number of exercises {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App