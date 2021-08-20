import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {searchPlaylists} from "../redux/playlists/playlists.actions"

import PlaylistCard from "../components/playlist-card.component.jsx"
import SearchInput from "../components/search-input.component.jsx"
import { useParams } from 'react-router-dom'


const CategoryPlaylistsPage = () => {
    
    // on mount fetch playlists matching the cateory id
    const  dispatch = useDispatch()
    const {searchTerm} = useParams();
    const token = useSelector(state => state.tokenReducer.token)
    const searchedPlaylists = useSelector(state => state.playlistsReducer.searchedPlaylists)


    useEffect(() => { dispatch(searchPlaylists(searchTerm,token)) }, [searchTerm])

    return (
        <div>
            <SearchInput />
            <div className="cards-display">
                <h2 className="cards-display__title">Results for "{searchTerm}"</h2>
                <div className="cards-display__grid">
                    {searchedPlaylists && searchedPlaylists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
                </div>
            </div>
        </div>
    )
}

export default CategoryPlaylistsPage