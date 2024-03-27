import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { updateReview } from "../../../redux/reviews";
import { fetchSingleBusiness } from "../../../redux/businesses";
import { getBusinessReviews } from "../../../redux/reviews";

function UpdateReviewPage({ reviewId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const reviewData = useSelector(state => state.reviews[reviewId]);
    const [review, setReview] = useState(reviewData?.review);
    const [stars, setStars] = useState(reviewData?.stars);
    const [hover, setHover] = useState(reviewData?.hover);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let errObj = {}
        if (!review) errObj.review = "Review is required."
        if (review && review.length < 85) errObj.review = "Reviews must be at least 85 characters in length.";
        if (review && review.length > 2000) errObj.review = "Reviews must be 2000 characters in length at most.";
        if (!stars) errObj.stars = "Paw Rating is required."
        setErrors(errObj);
    }, [review, stars])

    // useEffect(() => {
    //     dispatch(fetchSingleBusiness(reviewData.business_id))
    //     dispatch(getBusinessReviews(reviewData.business_id))
    // }, [dispatch, reviewData.business_id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const reviewData = {
            review,
            stars
        }

        await dispatch(updateReview(reviewId, reviewData))
            .then(dispatch(fetchSingleBusiness(reviewData.business_id)))
            .then(dispatch(getBusinessReviews(reviewData.business_id)))
            .then(closeModal)


        if (errors) {
            setErrors(errors)
        }
    }


    return (
        <>
            <h1>Update Your Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="review-fields">
                    <div id="paws-and-descriptions">
                        <div className='stars-container'>
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <div
                                        key={index}
                                        className={index <= (hover || stars) ? " paws-filled" : " paws-unfilled"}
                                        onClick={() => {
                                            setStars(index);
                                        }}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(stars)}
                                        onDoubleClick={() => {
                                            setStars(0);
                                            setHover(0);
                                        }}
                                    >
                                        <i className="fa-solid fa-paw" />&nbsp;
                                    </div>
                                )
                            })}

                        </div>
                        <div className="descriptions-container">
                            {hover == 1 && <p>Pawful!</p>}
                            {hover == 2 && <p>Less than purrfect</p>}
                            {hover == 3 && <p>Just OK-9</p>}
                            {hover == 4 && <p>Purraiseworthy!</p>}
                            {hover == 5 && <p>Absolutely Pawesome!</p>}
                        </div>
                    </div>
                    <textarea
                        id="review-input"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here. Please write a review of at least 85 characters but no more than 2000 characters."
                        name="review"
                    />
                </div>
                <div className="errors-container">
                    {errors.stars && <span className="errors">{errors.stars}</span>}
                    <br />
                    {errors.review && <span className="errors">{errors.review}</span>}
                </div>
                <button type="submit" disabled={!!Object.values(errors).length}>Update Review</button>
            </form>
        </>
    )
}

export default UpdateReviewPage
