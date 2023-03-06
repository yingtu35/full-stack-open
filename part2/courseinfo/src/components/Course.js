const Header = ({title}) => <h1>{title}</h1>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
const Total = ({parts}) => {
  const total = parts.reduce((total, part) => total+part.exercises, 0);
  return (
    <p><b>total of {total} exercises</b></p>
  )
}
const Course = ({course}) => {
  return (
    <>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

export default Course