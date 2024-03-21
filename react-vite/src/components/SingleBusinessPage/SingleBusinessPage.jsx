import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBusiness } from "../../redux/businesses";
import { useEffect } from "react";
import './SingleBusiness.css';
import BusinessDetails from "./BusinessDetails";
import BusinessContactCard from "./BusinessContactCard";

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
        if (avg !== 'New') {
            return avg.toFixed(1);
        } else {
            return avg
        }
    }

    return (business &&
        <>
            <div className="businessPhotoHeader">
                <img src='https://www.tcpalm.com/gcdn/-mm-/48d84e13920016e775b5cfe7e87d6effad5b942a/c=0-297-1950-1399/local/-/media/2018/07/28/Brevard/Brevard/636684056790409090-shr-56297evoxfsg9k0umsn-original-1-.jpg' />

                <div className="businessHeader">
                    <h1>{business.name}</h1>

                    {business.reviews?.num_reviews === 0 &&
                        <p className="businessReviews_first">
                            <i className="fa-solid fa-paw" />&nbsp; Be the first to review!
                        </p>
                    }
                    {business.reviews?.num_reviews > 0 &&
                        <p className="businessReviews">
                            <span className="pawBlock">
                                {business.reviews.avg_stars &&
                                    reviewStars(business.reviews.avg_stars)}</span>
                            &nbsp;&nbsp; {business.reviews.avg_stars && reviewAvg(business.reviews.avg_stars)}
                            ({business.reviews.num_reviews} reviews)
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
                        <span className="seeHours">See hours</span>
                    </div>
                </div>
                <div className="seeAllPhotos">
                    <button>See all {business.business_images && totalImages(business.business_images, business.review_images)} photos</button>
                </div>
            </div >
            <div className="businessContainer">
                <BusinessDetails business={business} />
                <BusinessContactCard business={business} />
            </div>
        </>
    )
}

export default SingleBusinessPage
