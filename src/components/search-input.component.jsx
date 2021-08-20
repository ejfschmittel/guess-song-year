import React, {useState} from 'react'
import {withRouter} from "react-router-dom"

import MaginifyGlassIcon from "../assets/svg/magnifying-glass.svg"

const SearchInput = ({history}) => {
    const [searchTerm, setSearchTerm] = useState("")

    const onChangeSerchTerm = (e) => setSearchTerm(e.target.value)

    // listen for Enter key press to submit search
    const onSearchKeyPress = (e) => e.key === "Enter" && submitSearch()

    // go to /search/searchTerm if searchTerm is not empty
    const submitSearch = () => searchTerm !== "" && history.push(`/search/${searchTerm}`)

    return (
        <div className="search-input">
            <label htmlFor="search-input" className="search-input__label">             
                <input className="search-input__input" id="search-input" onChange={onChangeSerchTerm} onKeyPress={onSearchKeyPress} value={searchTerm} />
                <span className="search-input__label-text">search Playlists</span>
                <div className="search-input__icon" onClick={submitSearch}>
                    <MaginifyGlassIcon />
                </div>             
            </label>
        </div>
    )
}

export default withRouter(SearchInput)