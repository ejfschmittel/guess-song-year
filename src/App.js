import React, {Suspense, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {getHash, createAccessUrl} from "./spotify/spotify.utils"
import {useAudio, AudioContext} from "./spotify/audio.context"
import {setToken} from "./redux/token/token.actions"

import {useDispatch, useSelector} from "react-redux"

//import Header from "./components/header.component"
import Header from "./components/header.component.jsx"
import Spinner from "./components/spinner.component.jsx"
import OverviewPage from './pages/overview.page.jsx'
import CategoryOverviewPage from './pages/category-overview.page.jsx'
import SearchPage from './pages/search.page.jsx'
import GamePage from './pages/game.page.jsx'
import "./styles/main.scss"



const App = () => {
    const audioControls = useAudio()
    const dispatch = useDispatch()
    const token = useSelector(state => state.tokenReducer.token)

    useEffect(() => {
        // onload check if hash or token present / then set
        const hash = getHash()
        const _token = hash.access_token;
        if(_token){
            console.log("set token")
            dispatch(setToken(_token))
        }else{
            window.location.href = createAccessUrl()
        }
    },[])

    return token ? (
        <Router>
            <AudioContext.Provider value={audioControls}>
                <Header /> 
                <Switch>
                    <Route path="/category/:categoryId" component={CategoryOverviewPage} />
                    <Route path="/search/:searchTerm" component={SearchPage}/>
                    <Route path="/game/:playlistId"  component={GamePage}/>
                    <Route path="/" component={OverviewPage}/>
                </Switch>
            </AudioContext.Provider>
        </Router>
    ) : <Spinner />
}

export default App;