const LOAD_SINGLE_BUSINESS = 'businesses/LOAD_SINGLE_BUSINESS'
const CREATE_BUSINESS = 'business/CREATE_BUSINESS'
const CREATE_BUSINESS_IMAGES = 'business/CREATE_BUSINESS_IMAGES'


export const loadSingleBusiness = (business) => ({
    type: LOAD_SINGLE_BUSINESS,
    business
})

export const receiveBusiness = (business) => ({
    type: CREATE_BUSINESS,
    business
})

export const createBusinessImages = (image) => (console.log("$$$$$$", image), {
    type: CREATE_BUSINESS_IMAGES,
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

export const createImage = (image) => async (dispatch) => {
    const response = await (`/api/images`, {
        method: "POST",
        body: image
    });
    console.log("XXXXX", image);
    console.log("RESPONSE!!!", response);

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(createBusinessImages(resPost));
        console.log(resPost, "there was no error");
    } else {
        console.log("There was an error making your post!")
    }
};

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
            const imageState = { ...state }
            console.log("ACTION!!!!!!", action);
            imageState[action.image.id] = action.image
            console.log("IMAGE STSTE!!!", state)
            return imageState
            // console.log("STATE!!!", state)
            // console.log("ACTION!!!", action);
            // return {
            //     ...state,
            //     [action.image.id]: action.image
            // }
        }
        default:
            return { ...state }
    }
}

export default businessesReducer;
