import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchCategories} from "../redux/categories/categories.actions"
import CategoryCard from "./category-card.component.jsx"

const CategoryOverview = () => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.tokenReducer.token)
    const categories = useSelector(state => state.categoriesReducer.categories)
    const fetchCategoriesError = useSelector(state => state.categoriesReducer.fetchCategoriesError)


    useEffect(() => dispatch(fetchCategories(token)),[])

    return (
        <div className="cards-display">
            <h2 className="cards-display__title">Categories</h2>
            <div className="cards-display__grid">
                {categories && categories.map((category) => <CategoryCard key={category.id} {...category}/>)}
            </div>
        </div>
    )
}


export default CategoryOverview