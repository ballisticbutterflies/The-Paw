const LOAD_BUSINESS_REVIEWS = 'reviews/LOAD_BUSINESS_REVIEWS'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const CREATE_REVIEW_IMAGES = 'review/CREATE_REVIEW_IMAGES'
const UPDATE_REVIEW = 'review/UPDATE_REVIEW'


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

export const editReview = (reviewId, review) => ({
    type: UPDATE_REVIEW,
    reviewId,
    review
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
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updateReview));
        return updatedReview
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
        default:
            return { ...state }
    }
}

export default reviewsReducer;
