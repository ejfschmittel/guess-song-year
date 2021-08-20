import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"

import {fetchCategoryPlaylists} from "../redux/playlists/playlists.actions"

import PlaylistCard from "../components/playlist-card.component.jsx"

const CategoryOverview = () => {
    const dispatch = useDispatch()
    const {categoryId} = useParams()
    const token = useSelector(state => state.tokenReducer.token)
    const categoryPlaylists = useSelector(state => state.playlistsReducer.categoryPlaylists)


    useEffect(() => { dispatch(fetchCategoryPlaylists(categoryId,token)) },[])

    return (
        <div className="cards-display">
            <h2 className="cards-display__title">Category: {categoryId}</h2>
            <div className="cards-display__grid">
                {categoryPlaylists && categoryPlaylists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
            </div>
        </div>
    )
}


export default CategoryOverview