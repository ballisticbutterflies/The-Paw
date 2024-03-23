const CREATE_REVIEW = 'review/CREATE_REVIEW'
const CREATE_REVIEW_IMAGES = 'review/CREATE_REVIEW_IMAGES'

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

export const createNewReview = (newReviewData, businessId) => async (dispatch) => {
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
        dispatch(createdReviewImages(createdReviewImages));
        return createdReviewImages;
    }
};
  

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW: {
            return {...state, reviews: {[action.newReview.id]: action.newReview}}
        }
        case CREATE_REVIEW_IMAGES: {
            return {...state, "images": [action.newImages]}

        }
        default: 
            return {...state}
    }
}

export default reviewsReducer;
