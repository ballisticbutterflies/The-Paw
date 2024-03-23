const LOAD_SINGLE_BUSINESS = 'businesses/LOAD_SINGLE_BUSINESS'
const CREATE_BUSINESS = 'business/CREATE_BUSINESS'
const CREATE_BUSINESS_IMAGES = 'business/CREATE_BUSINESS_IMAGES'
const LOAD_IMAGES = 'business/LOAD_IMAGES'


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

export const loadImages = (image) => ({
    type: LOAD_IMAGES,
    image
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

export const getImagesByBusiness = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}/images`)

    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images))
        return images
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
        case LOAD_IMAGES: {
            return { ...state, }
        }
        default:
            return { ...state }
    }
}

export default businessesReducer;
