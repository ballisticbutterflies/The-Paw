const LOAD_IMAGES = 'images/LOAD_IMAGES'

export const loadImages = (images) => (console.log("Images data:", images), {
    type: LOAD_IMAGES,
    images
})

export const getImagesByBusiness = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}/images`)

    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images))
        return images
    }
}


const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_IMAGES:
            console.log("Action payload:", action.images)
            return {
                ...state,
                [action.images.business_id]: action.images.images_list
            };
        default:
            return state;
    }
}

export default imagesReducer;
