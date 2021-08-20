import React, {useEffect, useState, useContext, useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link, useParams} from "react-router-dom"

import {AudioContext} from "../spotify/audio.context"

import {fetchPlaylistSongs, nextSong, resetSongs} from "../redux/songs/songs.actions"

let audio = null

/**
 * get playlist id in url an then fetches playlist (if no playlist => user tracks random)
 * => set the playlist (pre randomize playlist) // filter out without preview / randomizes / set count etc / set first song
 * if(playlist is set) => 
 */

const GamePage = () => {

    const dispatch = useDispatch()
    const {playlistId} = useParams()
    const token = useSelector(state => state.tokenReducer.token)
    const songs = useSelector(state => state.songsReducer.songs)
    const currentSongIndex = useSelector(state => state.songsReducer.currentSongIndex)
    const fetchSongsError = useSelector(state => state.songsReducer.fetchSongsError)
    const fetchSongsPending = useSelector(state => state.songsReducer.fetchSongsPending)


    const {startPlaying, stopPlaying} = useContext(AudioContext)
    const [revealed, setRevealed] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const [endReached, setEndReached] = useState(false)

    
    useEffect(() => {
        console.log("on mount")
    
        if(playlistId){
            dispatch(fetchPlaylistSongs(playlistId, token))
        }  
        
        return () => {
            dispatch(resetSongs())
            stopPlaying()       
        }
    }, [])


    // update song on currentSongindex change or songs update
   useEffect(() => { 
       if(songs && songs.length != 0 && songs.length > currentSongIndex){
            const song = songs[currentSongIndex]
            //playSong(song)
            startPlaying(song.track.preview_url)
            setCurrentSong(song)
       }   
    }, [currentSongIndex, songs])



    const onButtonClick = () => {
        if(songs.length <= currentSongIndex + 1){
            setEndReached(true)
        }

        if(!revealed){
            setRevealed(true)
        }else{
            // switch to next song
            if(songs.length > currentSongIndex){
                dispatch(nextSong(currentSongIndex));
                setRevealed(false)
            }
            stopPlaying();               
        }
    }


    const {trackName, trackArtist, releaseYear, spotifyUri} = useMemo(() => ({
        trackName: currentSong ? currentSong.track.name : "Title",
        trackArtist: currentSong ? currentSong.track.artists[0].name : "Artist",
        releaseYear: currentSong ? currentSong.track.album.release_date.split("-")[0] : "Year",
        spotifyUri: currentSong ? currentSong.track.external_urls.spotify : "#"
    }),[currentSong])
    
    return (
        <div className="game-page">
            <h1>{currentSong ? "Guess the Year..." : "Loading..."}</h1>

                <div className="song-display">
                    <h2 className="song-display__title">{trackName} - {trackArtist}</h2>
                    <div className="song-display__text">was released...</div>

                    <div className={`song-display__answer ${!revealed ? 'song-display__answer--hidden' : ''}`}>
                        <div className="song-display__year">{releaseYear}</div>
                        <a href={spotifyUri}>listen on Spotify</a>
                    </div>

                    {revealed && endReached ? 
                    <Link to="/" className="song-display__control">Playlist Ended - Back to Overview</Link>
                    :
                    <button className="song-display__control" onClick={onButtonClick}>{!revealed ? "Reveal" : "Next Song"}</button>
                    }
                </div>
        </div>
    )
}



export default GamePage