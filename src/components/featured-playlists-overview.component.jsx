import React, {useEffect} from 'react'
import {connect} from "react-redux"
import PlaylistCard from "./playlist-card.component.jsx"

import {fetchFeaturedPlaylists} from "../redux/playlists/playlists.actions"

const FeaturedPlaylists = ({token, playlists, fetchFeaturedPlaylists, fetchFeaturedError}) => {

    useEffect(() => fetchFeaturedPlaylists(token),[])

    return (
        <div className="cards-display">
            <h2 className="cards-display__title">Featured Playlists</h2>
            <div className="cards-display__grid">
                {playlists && playlists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer: {featuredPlaylists, fetchFeaturedError}}) => ({
    token: tokenReducer.token,
    playlists: featuredPlaylists,
    fetchFeaturedError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchFeaturedPlaylists: (token) => dispatch(fetchFeaturedPlaylists(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(FeaturedPlaylists)