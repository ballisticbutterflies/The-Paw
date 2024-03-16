const LOAD_BUSINESSES = 'search/LOAD_BUSINESSES'


export const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})


// THUNK

export const fetchBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/search/')

    if (response.ok) {
        const businesses = await response.json();
        dispatch(loadBusinesses(businesses))
    }
}

// REDUCER

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES: {
            const businessesState = {}
            action.businesses.businesses.map((business) => {
                businessesState[business.id] = business;
            })
            return businessesState;
        }
        default:
            return state
    }
}

export default searchReducer;
