import { useState, useEffect, useRef } from 'react'
import Search from './modules/Search'
import AddNew from './modules/AddNew'
import Numbers from './modules/Numbers'
import personService from './services/persons'
import Notification from './modules/Notification'

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showAll, setShowAll] = useState([]) 
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  if(!persons){
    return null
  }

  const AddNewPerson = (event) => {
    event.preventDefault()
    const validation = persons.some(val => val.name.includes(newName, 0))
    
    if(!validation){       
      const newPerson = {
        name: newName,
        number: newPhone,
      }
      personService
      .create(newPerson)
      .then(initialPersons => {
        setPersons(persons.concat(initialPersons))
        setNewName('')
        setNewPhone('')
        setAlertMessage(`Added ${newName}`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 3000)
      })  
    }else{      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName)      
        
        const updatedPerson = { 
                name: newName, 
                number: newPhone
              }
              personService
              .update(id.id, updatedPerson)
              .then(initialPersons => {
                setPersons(persons.map(person => person.id !== id.id ? person: initialPersons))
                setAlertMessage(`Updated ${newName}`)
                setTimeout(() => {
                setAlertMessage(null)
              },3000)
              })
              .catch(error => {                
                setAlertMessage(`Information of ${newName} has already been removed from server`)                
                setTimeout(() => {
                  setAlertMessage(null)
                }, 3000)
                setPersons(persons.filter(n => n.id !== id.id))
              })
              setNewName('')
              setNewPhone('')              
            } else {
              setNewName('')
              setNewPhone('')
            }
          
      
    }
  }

  const handleNewChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneChange =(event) => {
    setNewPhone(event.target.value)
  }

  const  numbersToShow = (event) => {
    const newArr = persons.filter(val => val.name == event.target.value)
    setShowAll(newArr)
  }

  const deletePerson = id => {
    personService.deletePerson(id)
    .then(initialPersons => {
      setPersons((prevPerson) => {
        const updatedPerson = prevPerson.filter(persons => persons.id !== id)
        return updatedPerson
      })
    })
  }

  

const filtered = showAll.length > 0 ? showAll : persons

  return (
    <div>
      <Notification message={alertMessage} />
      <h2>Phonebook</h2>
      <Search numbersToShow={numbersToShow}/>
      <h2>Add a new</h2>
      <AddNew AddNewPerson={AddNewPerson} newName={newName} newPhone={newPhone} handleNewChange={handleNewChange} handleNewPhoneChange={handleNewPhoneChange}/>
      <h2>Numbers</h2>
        {filtered.map(val => (
        <Numbers deletePerson={() => deletePerson(val.id)} key={val.name} person={val}/>
        ))}  
    </div>
  )
}

export default App