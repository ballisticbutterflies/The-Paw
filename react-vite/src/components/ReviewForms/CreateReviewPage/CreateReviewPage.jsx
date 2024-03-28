import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { createNewReview, createImage, getBusinessReviews } from "../../../redux/reviews";
import { fetchSingleBusiness } from "../../../redux/businesses";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from '../../LoginFormModal';
import "../ReviewForm.css"
import { useModal } from "../../../context/Modal";



function CreateReviewPage() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const { businessId } = useParams();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user);
    // const business = useSelector(state => (
    //     state.businesses[businessId]
    // ));

    const handleSubmit = async (e) => {
        // console.log("handlesubmit is running")
        e.preventDefault();

        setErrors({})

        const reviewData = {
            review,
            stars
        }

        // console.log("reviewData:", reviewData)

        let newlyCreatedReview = await dispatch(createNewReview(reviewData, businessId))
        // console.log("newlyCreatedReview: ", newlyCreatedReview)

        if (newlyCreatedReview.status == 403) {
            // console.log("")
            setErrors({ 'statusCode': 403, 'message': 'forbidden' });
        }

        if (newlyCreatedReview.errors) {
            // console.log("")
            setErrors(newlyCreatedReview.errors);
        }

        if (newlyCreatedReview && newlyCreatedReview.id) {
            // console.log("successful review submission");

            if (image != null) {
                // ! so like don't we need to be able to upload multiple images?

                const formData = new FormData();
                formData.append("image", image);
                let currentUserId;
                if (sessionUser) currentUserId = sessionUser.id
                if (!sessionUser) currentUserId = null
                formData.append("uploader_id", currentUserId);
                formData.append("imageable_id", newlyCreatedReview.id);
                formData.append("imageable_type", "review"); // Hardcoded for review type

                setImageLoading(true);
                // ! so to have multiple images uploaded at once we could iterate through an array of form data here
                dispatch(createImage(formData)).then(() => {
                    dispatch(fetchSingleBusiness(businessId))
                        .then(dispatch(getBusinessReviews(businessId)))
                        // .then(navigate(`/businesses/${businessId}`))
                        .then(() => closeModal())
                }).catch((error) => {
                    console.error("Error uploading image: ", error);
                    setImageLoading(false);
                })
            }
            else {
                // dispatch(fetchSingleBusiness(businessId)).then(dispatch(getBusinessReviews(businessId))).then(navigate(`/businesses/${businessId}`))
                dispatch(fetchSingleBusiness(businessId))
                    .then(dispatch(getBusinessReviews(businessId)))
                    .then(() => closeModal())
            }
        }

    }

    useEffect(() => {
        let errObj = {}
        if (!review) errObj.review = "Review is required."
        if (review && review.length < 85) errObj.review = "Reviews must be at least 85 characters in length.";
        if (review && review.length > 2000) errObj.review = "Reviews must be 2000 characters in length at most.";
        if (!stars) errObj.stars = "Paw Rating is required."
        setErrors(errObj);
        // dispatch(fetchSingleBusiness(businessId))
        //   }, [dispatch, businessId, review, stars])
    }, [review, stars])

    // const hasExistingReview = (currentUserId, business) => {
    //     reviews = business.reviews
    // }

    const businessPageURL = "/businesses/" + businessId

    // const isValidUser = (currentUserId) => {

    // }

    return (
        <>
            {errors.message != 'forbidden' && <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>Tell us about it!</h1>
                <div className="reviewForm">
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
                                            <span><i className="fa-solid fa-paw" /></span>&nbsp;
                                        </div>
                                    )
                                })}
                                <div className="descriptions-container">
                                    {hover == 0 && <span>Select your rating</span>}
                                    {hover == 1 && <span>Pawful!</span>}
                                    {hover == 2 && <span>Less than purrfect</span>}
                                    {hover == 3 && <span>Just OK-9</span>}
                                    {hover == 4 && <span>Purraiseworthy!</span>}
                                    {hover == 5 && <span>Absolutely Pawesome!</span>}
                                </div>
                            </div>
                        </div>
                        <textarea
                            id="review-input"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here. It must be least 85 characters, but no more than 2,000 characters."
                            name="review"
                        />
                    </div>
                    <div className="errorsContainer">
                        {errors.stars && <span className="errors">{errors.stars}</span>}&nbsp;
                        {errors.review && <span className="errors">{errors.review}</span>}
                    </div>
                    <div>
                        <h2>Attach Photos</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {(imageLoading) && <p>Loading...</p>}
                    </div>
                    <p>
                        {sessionUser && <button type="submit" disabled={!!Object.values(errors).length}>Create Review</button>}
                        {!sessionUser && <OpenModalButton
                            buttonText="Post Review"
                            modalComponent={<LoginFormModal />}
                        />}
                        {/* two submisbuttons one displayed when signed in one display when no sessoin user, the non user button triggers modal, yes user button submits forms */}
                    </p>
                </div>
            </form>
            }
            {
                errors.message == 'forbidden' &&
                <div className='custom-error-page'>
                    <h1>Bad dog!</h1>
                    {/* <p>Return to business page? </p> */}
                    <NavLink to={businessPageURL}>Looks like you do not have this access to this action. Click here to return to the business page.</NavLink> <br />
                    <img src="../../../images/icons/poop.png" alt="dog pooping on chair" />
                </div>
            }
            {/* conditional for sign in modal. */}
            {/* <div>
            <UploadPicture />
          </div> */}
        </ >
    )
}


export default CreateReviewPage
