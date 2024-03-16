import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBusiness } from "../../redux/businesses";
import { useEffect } from "react";
import './SingleBusiness.css';

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
                    <div className="businessReviews">
                        <span className="pawBlock">{business.reviews.avg_stars &&
                            reviewStars(business.reviews.avg_stars)}</span>
                        &nbsp; {business.reviews.avg_stars && reviewAvg(business.reviews.avg_stars)} ({business.reviews.num_reviews} reviews)
                    </div>
                    <div className="priceSubcat">{business.price} &#183; [SUBCATEGORIES]</div>
                    <div>
                        [CLOSED 8AM - 6PM]&nbsp;&nbsp; See hours
                    </div>
                </div>
                <div className="seeAllPhotos">
                    <button>See all photos</button>
                </div>
            </div>
        </>
    )
}

export default SingleBusinessPage
