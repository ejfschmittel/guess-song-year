import React, {lazy, Suspense} from 'react'

import SearchInput from "../components/search-input.component.jsx"

import FeaturedPlaylists from "../components/featured-playlists-overview.component.jsx";
import UserPlaylists from "../components/user-playlists-overview.component.jsx";
import CategoryOverview from "../components/category-overview.component.jsx";


const OverviewPage = () => (
    <div>
        <SearchInput />
        <FeaturedPlaylists />
        <UserPlaylists />     
        <CategoryOverview />
    </div>
)

export default OverviewPage