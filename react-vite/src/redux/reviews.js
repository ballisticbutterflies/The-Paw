const LOAD_BUSINESS_REVIEWS = 'reviews/LOAD_BUSINESS_REVIEWS'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const CREATE_REVIEW_IMAGES = 'review/CREATE_REVIEW_IMAGES'
const UPDATE_REVIEW = 'review/UPDATE_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'


export const loadBusinessReviews = (reviews) => ({
    type: LOAD_BUSINESS_REVIEWS,
    reviews
})

export const createReview = (newReview) => {
    return {
        type: CREATE_REVIEW,
        newReview,
    };
};

export const createReviewImages = (newImages) => {
    return {
        type: CREATE_REVIEW_IMAGES,
        newImages,
    };
};

export const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

export const removeImage = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

// THUNK

export const getBusinessReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadBusinessReviews(reviews))
        return reviews
    }
}

export const createNewReview = (newReviewData, businessId) => async (dispatch) => {

    // console.log("hitting creat new review thunk")
    const res = await fetch(`/api/businesses/${businessId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newReviewData),
    });

    if (!res.ok) {
        return res;
    } else if (res.ok) {
        const createdReview = await res.json();
        dispatch(createReview(createReview));
        return createdReview;
    }
};

export const createImage = (newImages) => async (dispatch) => {
    const res = await fetch(`/api/images/`, {
        method: "POST",
        body: newImages
    });


    if (!res.ok) {
        return res;
    } else if (res.ok) {
        const createdReviewImages = await res.json();
        dispatch(createReviewImages(createdReviewImages));
        return createdReviewImages;
    }
};

export const updateReview = (reviewId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review })
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updatedReview));
        return updatedReview
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeImage(reviewId));
    } else {
        const errors = await response.json();
        return errors;
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
        case CREATE_REVIEW: {
            return { ...state, reviews: { [action.newReview.id]: action.newReview } }
        }
        case CREATE_REVIEW_IMAGES: {
            return { ...state, "images": [action.newImages] }

        }
        case UPDATE_REVIEW: {
            // console.log("ACTION!!!!", action);
            return {
                ...state,
                [action.review.id]: action.review.review
            }
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.reviewId]
            return newState;
        }
        default:
            return { ...state }
    }
}

export default reviewsReducer;
