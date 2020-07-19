import React from 'react'

const Search = ({search, handleSearchChange}) => {
    return (    
        <>
        find countries:
        <input
            value = {search} 
            onChange = {handleSearchChange}/>
        </>
    )
}

export default Search