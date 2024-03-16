const LOAD_SINGLE_BUSINESS = 'businesses/LOAD_SINGLE_BUSINESS'


export const loadSingleBusiness = (business) => ({
    type: LOAD_SINGLE_BUSINESS,
    business
})

// THUNK

export const fetchSingleBusiness = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`)

    if (response.ok) {
        const business = await response.json();
        dispatch(loadSingleBusiness(business))
        return business
    }
}

// REDUCER

const businessesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SINGLE_BUSINESS:
            const businessState = {}

            action.business.business.forEach(business => {
                businessState[business.id] = business
            })
            return businessState
        default:
            return { ...state }
    }
}

export default businessesReducer;
