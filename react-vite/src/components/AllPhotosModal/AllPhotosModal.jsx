import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getImagesByBusiness } from "../../redux/images";
import "./AllPhotos.css";
import AddPhotosToBusiness from "../AddPhotosToBusiness/AddPhotosToBusiness";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams, Link } from "react-router-dom";


function AllPhotosModal({ businessId: propBusinessId, modalLoad }) {
    const dispatch = useDispatch();
    const { businessId: paramsBusinessId } = useParams()
    const businessId = propBusinessId || paramsBusinessId

    const images = useSelector(state => state.images[businessId])
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getImagesByBusiness(businessId))
    }, [dispatch, businessId])

    const lastInitial = (lastName) => {
        let last = lastName.charAt(0)
        return last + "."
    }

    return (images &&
        <div className={modalLoad ? "modal" : "page"}>
            <div className="allPhotosHeader">
                <div>{modalLoad ? (
                    <h1>Photos for {images.images.business_name}</h1>
                ) : (
                    <h1>Photos for <Link to={`/businesses/${businessId}`}>{images.images.business_name}</Link></h1>
                )}

                </div>
                <div>
                    <OpenModalButton
                        buttonText={<>
                            <i className="fa-solid fa-camera" />&nbsp;&nbsp;Add photo</>}
                        modalComponent={<AddPhotosToBusiness businessId={businessId} businessName={images.images.business_name} />}
                    />
                </div>
            </div>
            <div className={modalLoad ? "allPhotosContainerModal" : "allPhotosContainerPage"}>
                {images.images.business_images &&
                    images.images.business_images.map(business_image => (
                        <>
                            <span key={business_image.id} className="allPhotosWrapper">
                                <img className="images"
                                    src={business_image.url} />
                                <div className="photoCredit">
                                    <div>&nbsp;&nbsp;By {business_image.user.first_name} {business_image.user.last_name && lastInitial(business_image.user.last_name)}</div>
                                    <div>{sessionUser && sessionUser.id == business_image.uploader_id && (
                                        <span>
                                            <i className="fa-solid fa-trash-can" />&nbsp;&nbsp;
                                        </span>)}</div>
                                </div>
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

        </div>)
}

export default AllPhotosModal
