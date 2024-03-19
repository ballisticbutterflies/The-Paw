
const LOAD_BUSINESSES = 'search/LOAD_BUSINESSES'


export const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
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
    console.log(response)

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
