const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div
      style={{
        border: "3px solid red",
        borderRadius: "5px",
        fontSize: "1.5rem",
      }}
    >
      {message}
    </div>
  )
}

export default Notification
