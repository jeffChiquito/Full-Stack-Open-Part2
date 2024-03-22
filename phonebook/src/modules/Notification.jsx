const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else if (message.includes('Information')){
        console.log('handling error');
        return(
        <div className="error">
        {message}
      </div>
        )
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  export default Notification