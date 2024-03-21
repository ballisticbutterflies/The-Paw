import { useEffect } from "react";
import { getBusinessReviews } from "../../redux/reviews";
import { useDispatch, useSelector } from "react-redux";

function SingleBusinessReviews({ businessId }) {
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector(state => state.reviews)).sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
    });

    useEffect(() => {
        dispatch(getBusinessReviews(businessId))
    }, [dispatch, businessId])

    return (reviews &&
        <>
            <h3>Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id}>
                    {review.first_name}
                </div>
            ))}
        </>
    )
}

export default SingleBusinessReviews
