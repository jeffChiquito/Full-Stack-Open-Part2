const Numbers = ({person, deletePerson}) => {
    return(
      <div>
        <li key={person.name}>
            {person.name} {person.number} 
            <button onClick={deletePerson}>delete</button>
        </li>        
      </div>
    )
  }


export default Numbers