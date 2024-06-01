const LOAD_BUSINESSES = 'search/LOAD_BUSINESSES';
const CLEAR_BUSINESSES = 'search/CLEAR_BUSINESSES';
const SET_PAGINATION = 'search/SET_PAGINATION';

const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
});

const setPagination = (pagination) => ({
    type: SET_PAGINATION,
    pagination
});

export const clearBusinesses = () => ({
    type: CLEAR_BUSINESSES
});

// THUNKS
export const fetchBusinesses = (searchQuery, location, filters, page = 1, perPage = 10) => async (dispatch) => {

    let url ='/api/search';
    const queryParams = [];

    if (searchQuery) {
        queryParams.push(`search_query=${searchQuery}`);
    }
    if (location) {
        queryParams.push(`location=${location}`);
    }

    if (filters) {
        let filtered = Object.values(filters)
        queryParams.push(filtered.join(''))
    }
    console.log(searchQuery, location, filters, '{||||||| thunk |||}')

    queryParams.push(`page=${page}`);
    queryParams.push(`per_page=${perPage}`);

    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }

    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBusinesses(data.businesses));
        dispatch(setPagination({
            total: data.total,
            pages: data.pages,
            currentPage: data.current_page,
            perPage: data.per_page
        }));

    } else {
        const errors = await response.json();
        return errors;
    }
}

// export const searchBarBusinesses = (searchQuery, location, page = 1, perPage = 10) => async (dispatch) => {
//     let url ='/api/search';
//     const queryParams = [];

//     if (searchQuery) {
//         queryParams.push(`search_query=${searchQuery}`);
//     }
//     if (location) {
//         queryParams.push(`location=${location}`);
//     }

//     queryParams.push(`page=${page}`);
//     queryParams.push(`per_page=${perPage}`);

//     if (queryParams.length > 0) {
//         url += `?${queryParams.join('&')}`;
//     }


//     const response = await fetch(url)

//     if (response.ok) {

//         const data = await response.json();
//         dispatch(loadBusinesses(data.businesses));
//         dispatch(setPagination({
//             total: data.total,
//             pages: data.pages,
//             currentPage: data.current_page,
//             perPage: data.per_page
//         }));
//     } else {
//         const errors = await response.json();
//         return errors;
//     }
// }

const initialState = {
    businesses: {},
    pagination: {
        total: 0,
        pages: 0,
        currentPage: 1,
        perPage: 10
    }
};

// REDUCER
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES: {
            const newState = { ...state, businesses: {} };
            action.businesses.forEach((business) => {
                newState.businesses[business.id] = business;
            });
            return newState;
        }
        case CLEAR_BUSINESSES: {
            return { ...state, businesses: {} }
        }
        case SET_PAGINATION: {
            return { ...state, pagination: action.pagination };
        }
        default:
            return state;
    }
};

export default searchReducer;
