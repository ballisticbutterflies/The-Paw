import { useEffect, useState } from "react";
import { getBusinessReviews } from "../../redux/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateReviewPage from "../ReviewForms/UpdateReviewPage";
import { fetchSingleBusiness } from "../../redux/businesses";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../ReviewForms/DeleteReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SinglePhotoModal from "../SinglePhotoModal/SinglePhotoModal";

function SingleBusinessReviews({ businessId, sessionUser }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector(state => state.reviews)).sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
    });
    const [displayedCount, setDisplayedCount] = useState(5)

    useEffect(() => {
        const runDispatches = async () => {
            await dispatch(fetchSingleBusiness(businessId)).then(() =>
                dispatch(getBusinessReviews(businessId))
            );
        };
        runDispatches();
    }, [dispatch, businessId])


    const lastInitial = (lastName) => {
        let last = lastName.charAt(0)
        return last + "."
    }

    const reviewStars = (numStars) => {
        let filled_paws = [];
        let unfilled_paws = []

        for (let i = 0; i < parseInt(numStars); i++) {
            filled_paws.push(<span className="paws-filled" style={{ fontSize: "medium" }}><i className="fa-solid fa-paw"></i> </span>)
        }

        let remaining_paws = 5 - filled_paws.length

        for (let i = 0; i < remaining_paws; i++) {
            unfilled_paws.push(<span className="paws-unfilled" style={{ fontSize: "medium" }}><i className="fa-solid fa-paw"></i> </span>)
        }

        return [filled_paws, unfilled_paws]
    }

    const dateFormat = (date) => {
        let newDate = new Date(date)
        const enUSFormatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        return enUSFormatter.format(newDate)
    }

    const displayedReviews = reviews.slice(0, displayedCount);

    const handleShowMore = () => {
        setDisplayedCount(prevCount => prevCount + 5)
    }


    return (reviews &&
        <>
            {displayedReviews.map((review) => (review.user &&
                <div key={review.id}>
                    <div className="userInfo">
                        <div className="avatar" onClick={() => navigate(`/users/${review.user.id}`)}>
                            {review.user.user_image_url ? (
                                <img className="avatarFormat" src={review.user.user_image_url} />
                            ) : (
                                <img className="avatarFormat" src='../../images/defaultAvatar.png' />
                            )}
                        </div>
                        <div className="userName" onClick={() => navigate(`/users/${review.user.id}`)}>{review.user.first_name} {review.user.last_name && lastInitial(review.user.last_name)}</div>
                        <div className="loc">{review.user.city}, {review.user.state}</div>
                        <div className="stats">
                            <span style={{ fontSize: "small" }}><i className="fa-solid fa-paw" /></span> &nbsp;{review.user.user_num_reviews} &nbsp;&nbsp;&nbsp;
                            <span style={{ fontSize: "small" }}><i className="fa-regular fa-image" /></span> &nbsp;{review.user.user_num_images}</div>
                    </div>
                    <p>{review.stars && (reviewStars(review.stars))} &nbsp;&nbsp;{review.created_at && (dateFormat(review.created_at))}</p>
                    <p className='review-text'>{review.review}</p>
                    <div>
                        <div className="reviewImagesWrapper">{review.review_images !== 'No review images found' &&
                            review.review_images.map(image =>
                            (
                                <span key={image.id} className="reviewImagesContainer">
                                    <OpenModalMenuItem
                                        itemText={<><img
                                            className="reviewImages"
                                            src={image.url} /></>}
                                        modalComponent={<SinglePhotoModal imageUrl={image.url} />} />

                                </span>
                            )
                            )
                        } </div>
                    </div>
                    <div className="edit_delete">
                        {sessionUser && sessionUser?.id === review.user_id &&
                            <>
                                <OpenModalButton
                                    buttonText="Edit"
                                    modalComponent={<UpdateReviewPage reviewId={review.id} businessId={businessId} modalLoad={true} />} />
                                &nbsp;
                                &nbsp;
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal reviewId={review.id} businessId={businessId} />} />
                            </>}

                    </div>
                    <br />
                    <br />
                </div>
            )
            )}
            {reviews.length > displayedCount && (
                <button onClick={handleShowMore}>Show More</button >
            )
            }
        </>
    )
}

export default SingleBusinessReviews
