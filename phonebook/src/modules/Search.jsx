const Search = ({numbersToShow}) => {
    return(
      <form>
          <div>
            filter shown with <input onChange={numbersToShow}/>
          </div>
      </form>
    )
  }

export default Search