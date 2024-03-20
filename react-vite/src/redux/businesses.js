const LOAD_SINGLE_BUSINESS = 'businesses/LOAD_SINGLE_BUSINESS'
const CREATE_BUSINESS = 'business/CREATE_BUSINESS'


export const loadSingleBusiness = (business) => ({
    type: LOAD_SINGLE_BUSINESS,
    business
})

export const receiveBusiness = (business) => ({
    type: CREATE_BUSINESS,
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

export const createBusiness = (business) => async (dispatch) => {
    const response = await fetch('/api/businesses/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    })

    if (response.ok) {
        const newBusiness = await response.json();
        dispatch(receiveBusiness(newBusiness));
        return newBusiness
    } else {
        const errors = await response.json();
        return errors;
    }
}

// REDUCER

const businessesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SINGLE_BUSINESS: {
            const businessState = {}
            action.business.business.forEach(business => {
                businessState[business.id] = business
            })
            return businessState
        }
        case CREATE_BUSINESS: {
            const businessState = {}
            businessState[action.business.id] = action.business
            return businessState
        }
        default:
            return { ...state }
    }
}

export default businessesReducer;
