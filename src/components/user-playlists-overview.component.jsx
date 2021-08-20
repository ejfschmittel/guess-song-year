import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import PlaylistCard from "./playlist-card.component.jsx"

import {fetchUserPlaylists} from "../redux/playlists/playlists.actions"
import userTypes from '../redux/user/user.types.js'

const UserPlaylists = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.tokenReducer.token)
    const user = useSelector(state => state.userReducer.user)
    const userPlaylists = useSelector(state => state.playlistsReducer.userPlaylists)
    const fetchUserPlaylistError = useSelector(state => state.playlistsReducer.fetchUserPlaylistsError)


    useEffect(() => dispatch(fetchUserPlaylists(token)),[])

    console.log(!!userPlaylists)
    console.log(userPlaylists.length)

    if(!userPlaylists && userPlaylists.length == 0) return null;
  
    return (
        <div className="cards-display">
            <h2 className="cards-display__title">User Playlists</h2>
            <div className="cards-display__grid">
                {userPlaylists && userPlaylists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
            </div>

            {userPlaylists.length == 0 && <div>No playlists by {user?.display_name} found</div>}
        </div>
    )
}

export default UserPlaylists