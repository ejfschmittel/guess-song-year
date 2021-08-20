import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"

import {fetchUser} from "../redux/user/user.actions"

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)
    const featchUserError = useSelector(state => state.userReducer.fetchUserError)
    const token = useSelector(state => state.tokenReducer.token)
    

    useEffect(() => dispatch(fetchUser(token)), [])

    const image = user && user.images[0] ? user.images[0] : null;

    return (
        <header className="main-header">
            <Link to="/" className="main-header__headline">Song Guessr</Link>
            <div>
                {user && 
                    <div className="user-display">
                        {image && <img alt='user' className='user-display__img' src={image} />}
                        <span className="user-display__name">{user?.display_name}</span>                       
                    </div>
                }
            </div>
        </header>
    )
}


export default Header