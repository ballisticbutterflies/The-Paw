const LOAD_SINGLE_BUSINESS = 'businesses/LOAD_SINGLE_BUSINESS'
const CREATE_BUSINESS = 'businesses/CREATE_BUSINESS'
const CREATE_BUSINESS_IMAGES = 'businesses/CREATE_BUSINESS_IMAGES'
const UPDATE_BUSINESS = 'businesses/UPDATE_BUSINESS'
const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES'
const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS'

export const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

export const loadSingleBusiness = (business) => ({
    type: LOAD_SINGLE_BUSINESS,
    business
})

export const receiveBusiness = (business) => ({
    type: CREATE_BUSINESS,
    business
})

export const createBusinessImages = (post) => ({
    type: CREATE_BUSINESS_IMAGES,
    post
})

export const editBusiness = (business) => ({
    type: UPDATE_BUSINESS,
    business
})

export const removeBusiness = (businessId) => ({
    type: DELETE_BUSINESS,
    businessId
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

export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`/api/images/`, {
        method: "POST",
        body: post
    });


    if (response.ok) {
        const resPost = await response.json();
        dispatch(createBusinessImages(resPost));
        console.log(resPost, "there was no error");
    } else {
        console.log("There was an error making your post!")
    }
};

export const updateBusiness = (business) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${business.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    });
    if (response.ok) {
        const updatedBiz = await response.json();
        dispatch(editBusiness(updatedBiz));
        return updatedBiz;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const loadCurrUserBusinesses = () => async (dispatch) => {
    const response = await fetch(`/api/businesses/current`)

    if (response.ok) {
        const businesses = await response.json();
        dispatch(loadBusinesses(businesses))
        return businesses
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const deleteBusiness = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeBusiness(businessId));
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
        case CREATE_BUSINESS_IMAGES: {
            const imageState = { "images": [] }
            imageState["images"] = [action.post.image]
            return imageState
        }
        case LOAD_BUSINESSES: {
            const bizState = {}
            action.businesses.businesses.forEach(business => {
                bizState[business.id] = business;
            })
            return bizState
        }
        case DELETE_BUSINESS: {
            const newState = { ...state }
            delete newState[action.businessId]
            return newState
        }
        default:
            return { ...state }
    }
}

export default businessesReducer;
