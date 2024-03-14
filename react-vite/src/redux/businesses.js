import { createSelector } from 'reselect';

export const LOAD_BUSINESSES = '/businesses/LOAD_BUSINESSES';

export const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
});

export const getAllBusinesses = () => async dispatch => {
    const res = await fetch('/api/search')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBusinesses(data))
    }
}

const selectedBusinesses = state => state.businesses;

export const businessesArr = createSelector(selectedBusinesses, businesses => Object.values(businesses));

const initialState = {

}

export const businessesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES: {
            const allBusinesses = {};
            if (action.Businesses !== 'No businesses found') {
                action.Businesses.forEach(business => {
                    allBusinesses[business.id] = business;
                });
            }
            return allBusinesses
        }

        default:
            return state;
    }
}
