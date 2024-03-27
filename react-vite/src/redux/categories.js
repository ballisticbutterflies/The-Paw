const LOAD_CATEGORIES = 'categories/LOAD_CATEGORIES'

const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories
})

export const fetchCategories = () => async dispatch => {
  const response = await fetch('/api/categories')

  if (response.ok) {
    const categories = await response.json()
    dispatch(loadCategories(categories))
  }
}


const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      const categoryState = {}
      action.categories.categories.forEach(category => {
        categoryState[category.id] = category
      })
      return categoryState
    }
    default:
      return { ...state }
  }
}

export default categoriesReducer;
