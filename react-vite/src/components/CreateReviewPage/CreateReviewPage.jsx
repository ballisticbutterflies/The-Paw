import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createReview, createReviewImages } from "../../redux/reviews";
import { fetchSingleBusiness } from "../../redux/businesses";
import "./CreateReview.css"


function CreateReviewPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const sessionUser = useSelector(state => state.session.user)

    const { businessId } = useParams();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [hover, setHover] = useState(null);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({})

        const reviewData = {
            review,
            stars
        }

        let newlyCreatedReview = await dispatch(createReview(reviewData, businessId))

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

}
