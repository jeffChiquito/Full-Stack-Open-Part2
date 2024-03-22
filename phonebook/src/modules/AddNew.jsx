const AddNew = ({AddNewPerson, newName, newPhone, handleNewChange, handleNewPhoneChange}) => {

  return(
      <form onSubmit={AddNewPerson}>
          <div>
            name: <input value={newName} onChange={handleNewChange}/>
            
          </div>
          <div>
          number: <input value={newPhone} onChange={handleNewPhoneChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default AddNew