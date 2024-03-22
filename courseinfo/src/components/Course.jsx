const Course = ({courses}) => {
    const names = courses.map( val => <div key={val.id}>
                                        <h1 key={val.id}>{val.name}</h1>
                                            {val.parts.map(valAux => <p key={valAux.id}>{valAux.name} {valAux.exercises}</p>)}
                                            <p>total of {val.parts.reduce((a, {exercises}) => a+ exercises,0)} exercises</p>
                                      </div>)
        return(
        <div>
            {names}
        </div>
    )
}

export default Course 