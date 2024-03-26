import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createNewReview, createImage } from "../../redux/reviews";
import { fetchSingleBusiness } from "../../redux/businesses";
import "./CreateReview.css"


function CreateReviewPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    // const business = useSelector(state => (
    //     state.businesses[businessId]
    // ));

    const { businessId } = useParams();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        console.log("handlesubmit is running")
        e.preventDefault();

        setErrors({})

        const reviewData = {
            review,
            stars
        }

        console.log("reviewData:", reviewData)

        let newlyCreatedReview = await dispatch(createNewReview(reviewData, businessId))
        console.log("newlyCreatedReview: ", newlyCreatedReview)

        if(newlyCreatedReview.errors) {
            setErrors(newlyCreatedReview.errors);
        }
        
        if(newlyCreatedReview.id) {
            console.log("successful review submission");
        
            // ! so like don't we need to be able to upload multiple images?
            const formData = new FormData();
            formData.append("image", image);
            formData.append("uploader_id", sessionUser.id);
            formData.append("imageable_id", businessId); // Pass business ID
            formData.append("imageable_type", "review"); // Hardcoded for review type

            setImageLoading(true);
            // ! so to have multiple images uploaded at once we could iterate through an array of form data here
            dispatch(createReviewImages(formData).then(() => {
                dispatch(fetchSingleBusiness(businessId))
                .then(() => navigate(`/businesses/${businessId}`));
            }).catch((error)=> {
                console.error("Error uploading image: ", error);
                setImageLoading(false);
            }))    
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
    }, [ review, stars])
    
      return (
        <>
          { <form className="createReviewForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>Write your review here!</h1>
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
                                        <i className="fa-solid fa-paw"/>&nbsp;
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
              <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
              {(imageLoading) && <p>Loading...</p>}
              <button type="submit" disabled={!!Object.values(errors).length}>Create Review</button>
              {/* two submisbuttons one displayed when signed in one display when no sessoin user, the non user button triggers modal, yes user button submits forms */}
            </form>
          }
          {/* conditional for sign in modal. */}
          {/* <div>
            <UploadPicture />
          </div> */}
        </>
      )
}


export default CreateReviewPage
