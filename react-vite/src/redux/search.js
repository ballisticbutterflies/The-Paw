const LOAD_BUSINESSES = 'search/LOAD_BUSINESSES'
const CLEAR_BUSINESSES = 'search/CLEAR_BUSINESSES'

const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

export const clearBusinesses = () => ({
    type: CLEAR_BUSINESSES
})

// THUNKS
export const fetchBusinesses = (filters = {}) => async (dispatch) => {

    let url ='/api/search/';
    const queryParams = [];


    if (filters) {
        let filtered = Object.values(filters)
        queryParams.push(filtered.join(''))
    }

    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }

    const response = await fetch(url)

    if (response.ok) {
        const businesses = await response.json();
        dispatch(loadBusinesses(businesses))

    } else {
        const errors = await response.json();
        return errors;
    }
}

export const searchBarBusinesses = (searchQuery, location) => async (dispatch) => {
    let url ='/api/search/';
    const queryParams = [];

    if (searchQuery) {
        queryParams.push(`search_query=${searchQuery}`);
    }
    if (location) {
        queryParams.push(`location=${location}`);
    }
    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }


    const response = await fetch(url)

    if (response.ok) {

        const businesses = await response.json();
        dispatch(loadBusinesses(businesses))
        return businesses
    } else {
        const errors = await response.json();
        return errors;
    }
}

// REDUCER
const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES: {
            const newState = {};
            action.businesses.businesses.forEach((business) => {
                newState[business.id] = business;
            });
            return newState;
        }
        case CLEAR_BUSINESSES: {
            return {}
        }
        default:
            return state;
    }
};

export default searchReducer;
