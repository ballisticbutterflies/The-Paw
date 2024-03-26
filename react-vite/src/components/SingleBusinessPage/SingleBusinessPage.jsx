import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBusiness } from "../../redux/businesses";
import { useEffect, useRef } from "react";
import './SingleBusiness.css';
import BusinessDetails from "./BusinessDetails";
import BusinessContactCard from "./BusinessContactCard";
import AllPhotosModal from "../AllPhotosModal/AllPhotosModal";
import OpenModalButton from "../OpenModalButton";

function SingleBusinessPage() {
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const business = useSelector(state => (
        state.businesses[businessId]
    ))

    useEffect(() => {
        dispatch(fetchSingleBusiness(businessId))
    }, [dispatch, businessId])

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

    const totalImages = (businessImages, reviewImages) => {
        if (businessImages && reviewImages) {
            return businessImages.length + reviewImages.length;
        }
        else if (businessImages && !reviewImages) {
            return businessImages.length;
        }
        else if (reviewImages && !businessImages) {
            return reviewImages;
        }
    }

    const reviewAvg = (avg) => {
        if (avg !== null) {
            return avg.toFixed(1);
        } else {
            return avg
        }
    }

    const locationHoursSection = useRef(null)

    const scrollTo = (section) => {
        window.scrollTo({
            top: section.current.offsetTop,
            behavior: "smooth",
        });
    };


    return (business && business.business_images &&
        <>
            <div className="businessPhotoHeader">
                <img src={business.business_images[0].image_url} />

                <div className="businessHeader">
                    <h1>{business.name}</h1>

                    {business.reviews?.num_reviews === 0 &&
                        <p className="businessReviews_first">
                            <span className="paws-unfilled"><i className="fa-solid fa-paw" /></span>&nbsp; Be the first to review!
                        </p>
                    }
                    {business.reviews?.num_reviews > 0 &&
                        <p className="businessReviews">
                            <span className="pawBlock">
                                {business.reviews.avg_stars &&
                                    reviewStars(business.reviews.avg_stars)}</span>
                            &nbsp;&nbsp; {business.reviews.avg_stars && reviewAvg(business.reviews.avg_stars)}
                            &nbsp;({business.reviews.num_reviews} reviews)
                        </p>
                    }


                    {business.price !== null &&
                        <p className="priceSubcat">{business.price} &nbsp;&#183;&nbsp; {business.category?.name}
                        </p>
                    }

                    {business.price === null &&
                        <p className="priceSubcat">{business.category?.name}
                        </p>
                    }

                    <div className="currHours">
                        [CLOSED 8AM - 6PM]&nbsp;&nbsp;
                        <span className="seeHours" onClick={() => scrollTo(locationHoursSection)}>See hours</span>
                    </div>
                </div>
                <div className="seeAllPhotos">
                    {business.business_images && totalImages(business.business_images, business.review_images) === 1 ? (
                        <OpenModalButton
                            buttonText="See 1 photo"
                            modalComponent={<AllPhotosModal businessId={businessId} modalLoad={true} />}
                        />
                    ) : (<OpenModalButton
                        buttonText={`See all ${totalImages(business.business_images, business.review_images)} photos`}
                        modalComponent={<AllPhotosModal businessId={businessId} modalLoad={true} />}
                    />)
                    }
                </div>
            </div >
            <div className="businessContainer">
                <BusinessDetails business={business} businessId={businessId} locationHoursSection={locationHoursSection} />
                <BusinessContactCard business={business} />
            </div>
        </>
    )
}

export default SingleBusinessPage
