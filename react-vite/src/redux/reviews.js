const LOAD_BUSINESS_REVIEWS = 'reviews/LOAD_BUSINESS_REVIEWS'


export const loadBusinessReviews = (reviews) => ({
    type: LOAD_BUSINESS_REVIEWS,
    reviews
})


// THUNK

export const getBusinessReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadBusinessReviews(reviews))
        return reviews
    }
}

// REDUCER

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_BUSINESS_REVIEWS: {
            const reviewState = {}
            if (action.reviews.reviews !== "No reviews found") {
                action.reviews.reviews.forEach(review => {
                    reviewState[review.id] = review
                })
            }
            return reviewState
        }
        default:
            return { ...state }
    }
}

export default reviewsReducer;
