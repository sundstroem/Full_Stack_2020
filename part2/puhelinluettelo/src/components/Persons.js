import React from 'react'


const Persons = ( {personsToShow, deleteContact} ) => {
    return (
        <>
        {personsToShow.map(person => 
            <li key={person.name}>
                {person.name}: {person.number}
                <button onClick={() => deleteContact(person)}> delete </button>
            </li> 
        )}
        </>
    )

}
export default Persons