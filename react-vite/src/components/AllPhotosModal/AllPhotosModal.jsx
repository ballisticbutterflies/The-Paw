import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getImagesByBusiness } from "../../redux/images";
import "./AllPhotos.css"

function AllPhotosModal({ businessId, business }) {
    const dispatch = useDispatch();

    const images = useSelector(state => state.images[businessId])

    useEffect(() => {
        dispatch(getImagesByBusiness(businessId))
    }, [dispatch, businessId])

    const lastInitial = (lastName) => {
        let last = lastName.charAt(0)
        return last + "."
    }

    return (images && business &&
        <div className="modal">
            <h1>Photos for {business.name}</h1>
            <div className="allPhotosContainer">
                {images.images.business_images &&
                    images.images.business_images.map(business_image => (
                        <>
                            <span key={business_image.id} className="allPhotosWrapper">
                                <img className="images"
                                    src={business_image.url} />
                                <div className="photoCredit">&nbsp;&nbsp;From {business.name}</div>
                            </span>
                        </>
                    )
                    )}
                {images.images.review_images &&
                    images.images.review_images.map(review_image => (
                        <>
                            <span key={review_image.id} className="allPhotosWrapper">
                                <img className="images"
                                    src={review_image.url} />
                                <div className="photoCredit">&nbsp;&nbsp;By {review_image.user.first_name} {review_image.user.last_name && lastInitial(review_image.user.last_name)}</div>
                            </span>

                        </>
                    )
                    )}
            </div>
        </div>
    )
}

export default AllPhotosModal
