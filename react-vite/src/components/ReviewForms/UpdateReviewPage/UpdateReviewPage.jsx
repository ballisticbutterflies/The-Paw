import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const reviewData = {
            review,
            stars
        }
    }

    return "UPDATE"
}

export default UpdateReviewPage
