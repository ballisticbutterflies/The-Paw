const LOAD_IMAGES = 'images/LOAD_IMAGES'
const DELETE_IMAGE = 'images/DELETE_IMAGE'

export const loadImages = (image) => ({
    type: LOAD_IMAGES,
    image
})

export const removeImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
})

export const getImagesByBusiness = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}/images`)
    // console.log("RES", response);

    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images))
        return images
    }
}

export const deleteImage = (imageId) => async dispatch => {
    const response = await fetch(`/api/images/${imageId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeImage(imageId));
    } else {
        const errors = await response.json();
        return errors;
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
        case DELETE_IMAGE: {
            const newState = { ...state }
            // console.log("ACTION", action)
            // if (action.image.images.business_images)
            delete newState[action.imageId]
            return newState;
        }
        default:
            return { ...state }
    }
}

export default imagesReducer;
