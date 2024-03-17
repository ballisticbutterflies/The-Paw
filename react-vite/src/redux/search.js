const LOAD_BUSINESSES = 'search/LOAD_BUSINESSES'


export const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})


// THUNK

export const fetchBusinesses = (filters = {}) => async (dispatch) => {

    let url = '/api/search/';
    const queryParams = [];
    for (let key in filters.businesses) {
        if (filters.businesses[key]) {
            queryParams.push(`${key}=${filters.businesses[key]}`);
        }
    }
    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }

    console.log(url, "THUNK")

    const response = await fetch(url)



    if (response.ok) {
        const businesses = await response.json();
        dispatch(loadBusinesses(businesses))
    }
}

// REDUCER

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES: {
            const newState = { ...state };
            action.businesses.businesses.forEach((business) => {
                newState[business.id] = business;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default searchReducer;
