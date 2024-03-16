import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBusiness } from "../../redux/businesses";
import { useEffect } from "react";

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
            filled_paws.push(<span><i className="fa-solid fa-paw"></i></span>)
        }

        let remaining_paws = 5 - filled_paws.length

        for (let i = 0; i < remaining_paws; i++) {
            unfilled_paws.push(<span><i className="fa-solid fa-paw"></i></span>)
        }

        return [filled_paws, unfilled_paws]
    }
    return (business &&
        <>
            <h1>{business.name}</h1>
            {business.reviews.avg_stars &&
                reviewStars(business.reviews.avg_stars)}

        </>
    )
}

export default SingleBusinessPage
