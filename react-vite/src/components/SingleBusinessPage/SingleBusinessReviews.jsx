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

    const lastInitial = (lastName) => {
        let last = lastName.charAt(0)
        return last + "."
    }

    const reviewStars = (numStars) => {
        let filled_paws = [];
        let unfilled_paws = []

        for (let i = 0; i < numStars; i++) {
            filled_paws.push(<span className="paws-filled" style={{ fontSize: "medium" }}><i className="fa-solid fa-paw"></i> </span>)
        }

        let remaining_paws = 5 - filled_paws.length

        for (let i = 0; i < remaining_paws; i++) {
            unfilled_paws.push(<span className="paws-unfilled" style={{ fontSize: "medium" }}><i className="fa-solid fa-paw"></i> </span>)
        }

        return [filled_paws, unfilled_paws]
    }

    return (reviews &&
        <>
            <h3>Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id}>
                    <div className="userInfo">
                        <div className="avatar"><i className="fa-solid fa-circle-user" />
                        </div>
                        <div className="userName">{review.user?.first_name} {review.user.last_name && lastInitial(review.user.last_name)}</div>
                        <div className="loc">City, State</div>
                        <div className="stats">
                            <span className="paws-unfilled" style={{ fontSize: "small" }}><i className="fa-solid fa-paw" /></span> XX &nbsp;&nbsp;
                            <span className="paws-unfilled" style={{ fontSize: "small" }}><i class="fa-regular fa-image" /></span> XX</div>
                    </div>
                    <p>{review.stars && (reviewStars(review.stars))} &nbsp;&nbsp;XX, XX, XXXX</p>

                    <p>{review.review}</p>
                    <br />
                </div>
            ))}
        </>
    )
}

export default SingleBusinessReviews
