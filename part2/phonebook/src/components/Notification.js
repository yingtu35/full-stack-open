const Notification = ({message, isError}) => {
    const successStyle = {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        border: '3px solid green',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        padding: 10,
        margin: '10px 0px'
    }
    const errorStyle = {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        border: '3px solid red',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        padding: 10,
        margin: '10px 0px'
    }

    if (!message) {
        return null;
    }
    return (
        <div style={isError? errorStyle:successStyle}>
            {message}
        </div>
    )
}

export default Notification