import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, getUserReviews } from "../../redux/users";
import ManageReviewButton from "./ManageReviewsButton";
import { getDate } from "../../utils";
import './UserReviews.css'


function UserReviews() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    // console.log("line 14 on user reviewws", sessionUser)

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    // console.log("viewed user", viewedUser)

    let viewedUserReviews = useSelector(state => (
        state.users.userReviewsState ? state.users.userReviewsState.userReviews : null
    ))


    // // if(viewedUserReviews ) viewedUserReviews = Object.values(viewedUserReviews)
    // console.log("viewed user reviews", (viewedUserReviews))
    // if(viewedUserReviews )console.log("viewed user reviews isarray", Array.isArray(viewedUserReviews))

    // if(viewedUserReviews )console.log("viewed user reviews 0", viewedUserReviews[0])

    // const reformat = function () {
    //     students.map((student, index) => (
    //     <div key={index}>
    //         <span>{student.name}</span>
    //         <span>{student.age}</span>
    //     </div>
    // ))}

    const hasAtLeastOneReview = function () {
        if (viewedUserReviews != null) {
            if (!viewedUserReviews.length <= 0) {
                return true
            } else { return 'No Reviews' }
        } else { return null }
    }


    useEffect(() => {
        const runDispatches = async () => {
            await dispatch(getUser(parseInt(userId))).then(() =>
                dispatch(getUserReviews(parseInt(userId)))
            );
        };
        runDispatches();
    }, [dispatch, userId, sessionUser, viewedUser.num_reviews])

    let reviewsArr;
    if (viewedUserReviews) {
        reviewsArr = viewedUserReviews.map((user_review) => {
            // console.log("line 76",user_review)
            // console.log("line 77", Object.keys(user_review).toString())
            // console.log("line 78", Object.values(user_review))
            // console.log("line 79", Array.isArray(Object.values(user_review)))
            // console.log("line 70", Object.values(user_review)[0])
            return Object.values(user_review)[0]
        })
    }

    // console.log(reviewsArr[0].created_at)
    // console.log('reviewsArr',reviewsArr)
    // console.log("sessionUser",sessionUser)
    // console.log("sessionUser.id",sessionUser.id)
    // console.log("userId",userId)
    // console.log("userId === sessionUser.id",userId===sessionUser.id)
    // console.log("userId == sessionUser.id",userId==sessionUser.id)

    const reviewStars = (numStars) => {
        let filled_paws = [];
        let unfilled_paws = []

        for (let i = 0; i < numStars; i++) {
            filled_paws.push(<span className="paws-filled"><i className="fa-solid fa-paw"></i> </span>)
        }

        let remaining_paws = 5 - filled_paws.length

        for (let i = 0; i < remaining_paws; i++) {
            unfilled_paws.push(<span className="paws-unfilled"><i className="fa-solid fa-paw"></i> </span>)
        }

        return [filled_paws, unfilled_paws]
    }

    return (
        <>
            <h2>Reviews</h2>
            <div>
                {viewedUserReviews && hasAtLeastOneReview() == 'No Reviews' &&
                    (<h4>Looks like this user has not written any reviews!</h4>)
                }
                {viewedUserReviews && hasAtLeastOneReview() && (
                    reviewsArr.map(user_review => (
                        <div key={user_review.id} id="reviews-container">
                            <div className="review-card" onClick={() => navigate(`/businesses/${user_review.business.business[0].id}`)}>
                                <div className="biz-review-content">
                                    <div className="business-content" >
                                        <div className="business-image">
                                            <img className="formatImage" src={user_review.business.business[0].business_images[0].image_url} alt="" />
                                        </div>
                                        <h4 className="biz-name">{user_review.business.business[0].name}</h4>
                                        <p className="biz-category">{user_review.business.business[0].category.name}</p>
                                        <p className="biz-location">{user_review.business.business[0].city}, {user_review.business.business[0].state}</p>
                                    </div>
                                    <div className="review-content">
                                        <div className="paw-and-date">
                                            <span className="pawBlock">{reviewStars(user_review.stars)} &nbsp;&nbsp;{getDate(user_review.created_at)}</span>
                                        </div>
                                        <p id="review-text">{user_review.review}</p>
                                        <div className="reviewImagesWrapper">{user_review.images.length > 0 && user_review.images.map(image =>
                                        (
                                            <span key={image.id} className="reviewImagesContainer">
                                                <img
                                                    className="reviewImages"
                                                    src={image.image_url} /></span>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {(sessionUser && (sessionUser.id == userId) &&
                                <div className="manage-button">
                                    <ManageReviewButton review={user_review} userId={userId} />
                                </div>
                            )}
                        </div>
                    ))

                )}
            </div>
        </>
    )
}

export default UserReviews;
