const LOAD_IMAGES = 'images/LOAD_IMAGES'

export const loadImages = (image) => (console.log("TEST", image), {
    type: LOAD_IMAGES,
    image
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
        case LOAD_IMAGES: {
            // const imageState = {}
            // if (action.image.images.business_images)
            //     imageState[action.image.business_id] = action.image.images.business_images
            // if (action.image.images.review)
            //     imageState[action.image.business_id] = action.image.images.review

            // console.log("ACTION", imageState);
            // return imageState
            return { ...state, [action.image.images.business_id]: action.image }
        }
        default:
            return { ...state }
    }
}

export default imagesReducer;
