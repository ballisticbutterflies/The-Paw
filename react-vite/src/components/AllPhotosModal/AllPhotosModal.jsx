import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useEffect } from "react";
import { getImagesByBusiness } from "../../redux/images";
import "./AllPhotos.css"

function AllPhotosModal({ businessId, business }) {
    const dispatch = useDispatch();

    const images = useSelector(state => state.images[businessId])

    useEffect(() => {
        dispatch(getImagesByBusiness(businessId))
    }, [dispatch, businessId])

    return (images && business &&
        <div className="modal">
            <h1>Photos for {business.name}</h1>
            <div className="allPhotosContainer">
                {images.images.business_images &&
                    images.images.business_images.map(business_image => (
                        <span key={business_image.id} className="allPhotosWrapper">
                            <img className="images"
                                src={business_image.url} />
                        </span>
                    )
                    )}
                {images.images.review_images &&
                    images.images.review_images.map(review_image => (
                        <span key={review_image.id} className="allPhotosWrapper">
                            <img className="images"
                                src={review_image.url} />
                        </span>
                    )
                    )}
            </div>
        </div>
    )
}

export default AllPhotosModal
